import type { Profile } from "~/types/global.types";

export const allProfiles = ref<Profile[]>([]);
export const myProfile = ref<Profile>();
/**
 * Retrieve all todo for the signed in user
 */
export async function fetchProfiles() {
  try {
    const supabase = useSupabaseClient();
    const { data: profiles, error } = await supabase.from("profiles").select();

    if (error) {
      console.log("error", error);
      return;
    }
    if (profiles === null) {
      allProfiles.value = [];
      return;
    }
    allProfiles.value = profiles;
  } catch (err) {
    console.error("Ошибька", err);
  }
}

export function fetchProfile(id: string, object: any) {
  try {
    object = Object.values(allProfiles.value).find(
      (profile: any) => profile.id == id
    );
  } catch (err) {
    console.error("Ошибка", err);
  }
}

/**
 *  Add a new todo to supabase
 */
export async function addProfile(profile: Profile[]): Promise<Profile | null> {
  try {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase
      .from("profiles")
      .insert(profile as never)
      .single();

    if (error) {
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new organization");
    return data;
  } catch (err) {
    console.error("Unknown problem inserting to db", err);
    return null;
  }
}

/**
 * Targets a specific todo via its record id and updates the is_completed attribute.
 */
export async function updateProfile(profile: Profile) {
  try {
    const supabase = useSupabaseClient();
    const { error } = await supabase
      .from("profiles")
      .update(profile as never)
      .eq("id", profile.id)
      .single();

    if (error) {
      console.error("There was an error updating", error);
      return;
    }

    console.log("Updated task", profile.id);
  } catch (err) {
    console.error("Unknown problem updating record", err);
  }
}

/**
 *  Deletes a todo via its id
 */
async function deleteProfile(profile: Profile) {
  try {
    const supabase = useSupabaseClient();
    await supabase.from("profiles").delete().eq("id", profile.id);
    console.log("deleted organization", profile.id);
  } catch (error) {
    console.error("error", error);
  }
}
