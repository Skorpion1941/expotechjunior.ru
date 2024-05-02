import type { Direction } from "~/types/global.types";

export const allDirections = ref<Direction[]>([]);

/**
 * Retrieve all todo for the signed in user
 */
export async function fetchDirections() {
  try {
    const supabase = useSupabaseClient();
    const { data: directions, error } = await supabase
      .from("directions")
      .select()
      .order("id");

    if (error) {
      console.log("error", error);
      return;
    }
    if (directions === null) {
      allDirections.value = [];
      return;
    }
    allDirections.value = directions;
  } catch (err) {
    console.error("Ошибка", err);
  }
}

/**
 *  Add a new todo to supabase
 */
export async function addDirection(
  direction: Direction[]
): Promise<Direction | null> {
  try {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase
      .from("directions")
      .insert(direction as never)
      .single();

    if (error) {
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new direction");
    return data;
  } catch (err) {
    console.error("Unknown problem inserting to db", err);
    return null;
  }
}

/**
 * Targets a specific todo via its record id and updates the is_completed attribute.
 */
export async function updateDirection(direction: Direction) {
  try {
    const supabase = useSupabaseClient();
    const { error } = await supabase
      .from("directions")
      .update(direction as never)
      .eq("id", direction.id as number);

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
export async function deleteDirection(direction: Direction) {
  try {
    const supabase = useSupabaseClient();
    await supabase.from("directions").delete().eq("id", direction.id);
  } catch (error) {
    console.error("error", error);
  }
}
