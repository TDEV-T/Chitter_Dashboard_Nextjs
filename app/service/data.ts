export async function getUserData(token: string) {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: token,
      },
    });

    if (resp.status === 200) {
      const data = await resp.json();
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getStatsData() {
  try {
    const token = localStorage.getItem("token");

    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}admin/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: token!,
      },
    });

    if (resp.status === 200) {
      const data = await resp.json();
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}
