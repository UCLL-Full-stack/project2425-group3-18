import { KotData } from "@/types";

const addKot = async (kotData: KotData): Promise<any> => {
  try {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
    const token = loggedInUser.token;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const body = JSON.stringify({
      kot: {
        location: kotData.location,
        price: kotData.price,
        surfaceSpace: kotData.surfaceSpace,
        username: loggedInUser.username,
      }
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/koten/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating kot:", errorData);
      throw new Error(errorData.message || "Failed to create kot");
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error("Error in addKot function:", error);
    throw error;
  }
};

export const kotService = {
  addKot,
};
