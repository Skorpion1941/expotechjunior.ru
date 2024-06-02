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
      console.log("Ошибка", error);
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
      console.error("Произошла ошибка при добавлении", error);
      return null;
    }

    console.log("Новый проект добавлен");
    return data;
  } catch (err) {
    console.error("Неизвестная проблема при добавлении в базу данных", err);
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
      .eq("id", projects.id as number);

    if (error) {
      console.error("Произошла ошибка при изменении", error);
      return;
    }

    console.log("Обнавленный проект", projects.id);
  } catch (err) {
    console.error("Неизвестная проблема с обновлением записи", err);
  }
}

/**
 *  Deletes a todo via its id
 */
export async function deleteProject(projects: Project) {
  try {
    const supabase = useSupabaseClient();
    await supabase
      .from("projects")
      .delete()
      .eq("id", projects.id as number);
    console.log("Проект удален", projects.id);
  } catch (error) {
    console.error("Ошибка", error);
  }
}
