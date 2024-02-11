export async function loginAdmin(credentials: any) {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_API}loginAdmin`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function curUser(token: string) {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_API}checkCurUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authtoken: token,
    },
  });
}
