import type { Form } from "~/types/global.types";

export const allForms = ref<Form[]>([]);

/**
 * Retrieve all todo for the signed in user
 */
export async function fetchForms() {
  try {
    const supabase = useSupabaseClient();
    const { data: forms, error } = await supabase
      .from("forms")
      .select("*, directions(*)")
      .order("id");

    if (error) {
      console.log("error", error);
      return;
    }
    if (forms === null) {
      allForms.value = [];
      return;
    }
    allForms.value = forms;
  } catch (err) {
    console.error("Ошибка", err);
  }
}
/**
 *  Add a new todo to supabase
 */
export async function addForm(form: Form[]) {
  try {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase
      .from("forms")
      .insert(form as never)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new form");
  } catch (err) {
    alert("Error");
    console.error("Unknown problem inserting to db", err);
    return null;
  }
}

/**
 * Targets a specific todo via its record id and updates the is_completed attribute.
 */
export async function updateForm(form: Form) {
  try {
    const supabase = useSupabaseClient();
    const { error } = await supabase
      .from("forms")
      .update(form as never)
      .eq("id", form.id as number)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error updating", error);
      return;
    }
  } catch (err) {
    alert("Error");
    console.error("Unknown problem updating record", err);
  }
}

/**
 *  Deletes a todo via its id
 */
async function deleteForm(form: Form) {
  try {
    const supabase = useSupabaseClient();
    await supabase
      .from("forms")
      .delete()
      .eq("id", form.id as number);
    console.log("deleted form", form.id);
  } catch (error) {
    console.error("error", error);
  }
}
