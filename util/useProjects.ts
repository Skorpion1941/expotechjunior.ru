import type { Project } from "~/types/global.types";

export const allProjects = ref<Project[]>([]);

/**
 * Retrieve all todo for the signed in user
 */
export async function fetchProjects() {
  try {
    const supabase = useSupabaseClient();
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*, directions(*)")
      .order("id");

    if (error) {
      console.log("error", error);
      return;
    }
    if (projects === null) {
      allProjects.value = [];
      return;
    }
    allProjects.value = projects;
  } catch (err) {
    console.error("Ошибка", err);
  }
}

/**
 *  Add a new todo to supabase
 */
export async function addProject(projects: Project[]): Promise<Project | null> {
  try {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase
      .from("projects")
      .insert(projects as never)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new projects");
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
export async function updateProject(projects: Project) {
  try {
    const supabase = useSupabaseClient();
    const { error } = await supabase
      .from("projects")
      .update(projects as never)
      .eq("id", projects.id)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error updating", error);
      return;
    }

    console.log("Updated task", projects.id);
  } catch (err) {
    alert("Error");
    console.error("Unknown problem updating record", err);
  }
}

/**
 *  Deletes a todo via its id
 */
async function deleteProject(projects: Project) {
  try {
    const supabase = useSupabaseClient();
    await supabase.from("projects").delete().eq("id", projects.id);
    console.log("deleted projects", projects.id);
  } catch (error) {
    console.error("error", error);
  }
}
