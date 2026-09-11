import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Can not delete from server");
  }
}

export async function CreateEditCabin(cabinData, id) {
  // to check if image url exit in database
  const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);

  // បង្កើតឈ្មោះ និង Path រូបភាព (ករណីមាន File ថ្មី)
  const imageName = `${Math.random()}-${cabinData.image?.name}`.replaceAll(
    "/",
    "",
  );

  // to check if image has path in database and keep that
  const imagePath = hasImagePath
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  // 3. Execute Query ទៅកាន់ Database
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...cabinData, image: imagePath }]);

  if (id) query = query.update({ ...cabinData, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Can not create/edit cabin on server");
  }
  if (hasImagePath) return data;
  // 5. Upload រូបភាពថ្មីទៅ Storage Bucket
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, cabinData.image);

  // 6. ប្រសិនបើ Upload រូបភាពបរាជ័យ
  if (storageError) {
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created",
    );
  }

  return data;
}
