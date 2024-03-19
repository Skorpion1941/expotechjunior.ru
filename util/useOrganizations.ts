import type { Organization } from "~/types/global.types";

export const allOrganizations = ref<Organization[]>([]);

/**
 * Retrieve all todo for the signed in user
 */
export async function fetchOrganizations() {
  try {
    const supabase = useSupabaseClient();
    const { data: organizations, error } = await supabase
      .from("organizations")
      .select()
      .order("id");

    if (error) {
      console.log("error", error);
      return;
    }
    if (organizations === null) {
      allOrganizations.value = [];
      return;
    }
    allOrganizations.value = organizations;
  } catch (err) {
    console.error("Ошибька", err);
  }
}

/**
 *  Add a new todo to supabase
 */
export async function addOrganization(
  organization: Organization[]
): Promise<Organization | null> {
  try {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase
      .from("organizations")
      .insert(organization as never)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new organization");
    return data;
  } catch (err) {
    alert("Error");
    console.error("Unknown problem inserting to db", err);
    return null;
  }
}

/**
 * Targets a specific todo via its record id and updates the is_completed attribute.
 */
export async function updateOrganization(organization: Organization) {
  try {
    const supabase = useSupabaseClient();
    const { error } = await supabase
      .from("organizations")
      .update(organization as never)
      .eq("id", organization.id)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error updating", error);
      return;
    }

    console.log("Updated task", organization.id);
  } catch (err) {
    alert("Error");
    console.error("Unknown problem updating record", err);
  }
}

/**
 *  Deletes a todo via its id
 */
async function deleteTodo(organization: Organization) {
  try {
    const supabase = useSupabaseClient();
    await supabase.from("organizations").delete().eq("id", organization.id);
    console.log("deleted organization", organization.id);
  } catch (error) {
    console.error("error", error);
  }
}
