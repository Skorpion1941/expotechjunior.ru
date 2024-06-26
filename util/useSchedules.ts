import type { Schedule } from "~/types/global.types";

export const allSchedules = ref<Schedule[]>([]);

/**
 * Retrieve all todo for the signed in user
 */
export async function fetchSchedules() {
  try {
    const supabase = useSupabaseClient();
    const { data: schedules, error } = await supabase
      .from("schedules")
      .select("*, projects(*)")
      .order("time");

    if (error) {
      console.log("error", error);
      return;
    }
    if (schedules === null) {
      allSchedules.value = [];
      return;
    }
    allSchedules.value = schedules;
  } catch (err) {
    console.error("Ошибка", err);
  }
}
/**
 *  Add a new todo to supabase
 */
export async function addSchedule(
  schedule: Schedule[]
): Promise<Schedule | null> {
  try {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase
      .from("schedules")
      .insert(schedule as never);

    if (error) {
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new schedules");
    return data;
  } catch (err) {
    console.error("Unknown problem inserting to db", err);
    return null;
  }
}

/**
 * Targets a specific todo via its record id and updates the is_completed attribute.
 */
export async function updateSchedule(schedule: Schedule) {
  try {
    const supabase = useSupabaseClient();
    const { error } = await supabase
      .from("schedules")
      .update(schedule as never)
      .eq("id", schedule.id as number);

    if (error) {
      console.error("There was an error updating", error);
      return;
    }
  } catch (err) {
    console.error("Unknown problem updating record", err);
  }
}

/**
 *  Deletes a todo via its id
 */
export async function deleteSchedule(schedule: Schedule) {
  try {
    const supabase = useSupabaseClient();
    await supabase
      .from("schedules")
      .delete()
      .eq("id", schedule.id as number);
    console.log("deleted schedules", schedule.id);
  } catch (error) {
    console.error("error", error);
  }
}
