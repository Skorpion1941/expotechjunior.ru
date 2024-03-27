import type { Project, Role } from "~/types/global.types";

export const allRoles = ref<Role[]>([]);

/**
 * Retrieve all todo for the signed in user
 */
export async function fetchRoles() {
  try {
    const supabase = useSupabaseClient();
    const { data: role, error } = await supabase
      .from("roles")
      .select("*")
      .order("id");

    if (error) {
      console.log("error", error);
      return;
    }
    if (role === null) {
      allRoles.value = [];
      return;
    }
    allRoles.value = role;
  } catch (err) {
    console.error("Ошибка", err);
  }
}

/**
 *  Add a new todo to supabase
 */
export async function addRoles(role: Role[]): Promise<Project | null> {
  try {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase
      .from("roles")
      .insert(role as never)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new roles");
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
export async function updateRoles(role: Role) {
  try {
    const supabase = useSupabaseClient();
    const { error } = await supabase
      .from("roles")
      .update(role as never)
      .eq("id", role.id)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error updating", error);
      return;
    }

    console.log("Updated task", role.id);
  } catch (err) {
    alert("Error");
    console.error("Unknown problem updating record", err);
  }
}

/**
 *  Deletes a todo via its id
 */
async function deleteRoles(role: Role) {
  try {
    const supabase = useSupabaseClient();
    await supabase.from("projrolesects").delete().eq("id", role.id);
    console.log("deleted roles", role.id);
  } catch (error) {
    console.error("error", error);
  }
}
