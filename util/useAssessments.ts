import type { Assessment } from "~/types/global.types";

export const allAssessments = ref<Assessment[]>([]);

/**
 * Retrieve all todo for the signed in user
 */
export async function fetchAssessments() {
  try {
    const supabase = useSupabaseClient();
    const { data: assessments, error } = await supabase
      .from("assessments")
      .select("*, projects(*)")
      .order("id");

    if (error) {
      console.log("error", error);
      return;
    }
    if (assessments === null) {
      allAssessments.value = [];
      return;
    }
    allAssessments.value = assessments;
  } catch (err) {
    console.error("Ошибка", err);
  }
}
/**
 *  Add a new todo to supabase
 */
export async function addAssessment(
  assessment: Assessment[]
): Promise<Assessment | null> {
  try {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase
      .from("assessments")
      .insert(assessment as never)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new assessment");
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
export async function updateAssessment(assessment: Assessment) {
  try {
    const supabase = useSupabaseClient();
    const { error } = await supabase
      .from("assessments")
      .update(assessment as never)
      .eq("id", assessment.id as number)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error updating", error);
      return;
    }

    console.log("Updated task", assessment.id);
  } catch (err) {
    alert("Error");
    console.error("Unknown problem updating record", err);
  }
}

/**
 *  Deletes a todo via its id
 */
async function deleteAssessment(assessment: Assessment) {
  try {
    const supabase = useSupabaseClient();
    await supabase
      .from("assessments")
      .delete()
      .eq("id", assessment.id as number);
    console.log("deleted assessment", assessment.id);
  } catch (error) {
    console.error("error", error);
  }
}
