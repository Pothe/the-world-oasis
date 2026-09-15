import supabase, { supabaseUrl } from "./supabase";

export async function Signup({ email, fullName, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}
export async function Login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  console.log(data);

  return data;
}

export async function getCurrentuser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function UpdateUser({ fullName, password, avatar }) {
  let updateData = {};
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  console.log(fileName, avatar);
  const { error: errorStorage } = await supabase.storage
    .from("avatas")
    .upload(fileName, avatar);
  if (errorStorage) throw new Error("can not upload avatars");

  const { data: updateuser, error: errorupdateUser } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatas/${fileName}`,
      },
    });

  if (errorupdateUser) throw new Error("can update avatar of user");

  return updateuser;
}
export async function Logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Fail to log out");
}
