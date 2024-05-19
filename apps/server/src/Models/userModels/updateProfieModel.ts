import Prisma from "../Prisma";

export const updateProfilePicture = async (url: string, userId: string) => {
  try {
    const result = await Prisma.userCredentials.update({
      data: {
        profilePicture: url,
      },
      where: {
        id: userId,
      },
    });

    if (result) {
      return {
        success: true,
        result: result,
      };
    }

    return {
      success: false,
      result: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      result: null,
    };
  }
};

export const getUserDetails = async (userid: string) => {
  try {
    const result = await Prisma.userCredentials.findUnique({
      select: {
        id: true,
        emailId: true,
        name: true,
        profilePicture: true,
        status: true,
      },
      where: {
        id: userid,
      },
    });

    if (!result) {
      return {
        success: false,
        result: null,
      };
    }

    return {
      success: true,
      result: result,
    };
  } catch (error) {
    console.log("error in getUserDetails");
    console.log(error);
    return {
      success: true,
      result: null,
    };
  }
};
