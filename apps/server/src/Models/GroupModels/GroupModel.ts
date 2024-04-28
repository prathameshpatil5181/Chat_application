import { error } from "console";
import Prisma from "../Prisma";

/*
function returns

{
    success:boolean
    result:result all info
}

*/

export interface IcreateGroupModel {
  success: boolean;
  result: null | {};
}

export const createGroupModel = async (
  members: string[],
  user: string,
  name: string
): Promise<IcreateGroupModel> => {
  members.push(user);

  try {
    const result = await Prisma.group.create({
      data: {
        name: name,
        Members: members,
        Admins: [user],
        createdBy: user,
        createdOn: new Date(),
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
    console.log("error in GroupModel to create the groupt");
    console.log("error");
    return {
      success: false,
      result: null,
    };
  }
};

export const getAllUserGroups = async (id: string) => {
  try {
    const result = await Prisma.group.findMany({
      where: {
        Members: {
          has: id,
        },
      },
    });

    if (!result) {
      return {
        success: false,
        result: null,
      };
    }

    let groups: { to: string }[] = [];

    result.forEach((grp) => groups.push({ to: grp.gid }));
    const messages = await getGroupChatMsg(groups);

    if (!messages.success) {
      return {
        success: true,
        result: result,
        messages: null
      };
    }

    return {
      success: true,
      result: result,
      messages: messages.msg,
    };
  } catch (error) {
    console.log("error in getting groups");
    console.log(error);
    return {
      success: false,
      result: null,
    };
  }
};

const getGroupChatMsg = async (id: { to: string }[]) => {
  try {
    const msg = await Prisma.groupChat.findMany({
      where: {
        OR: id,
      },
    });

    if (!msg) {
      return {
        success: false,
        msg: null,
      };
    }
    return {
      success: true,
      msg: msg,
    };
  } catch (error) {
    console.log("error in getting messags");
    console.log(error);
    return {
      success: false,
      msg: null,
    };
  }
};

export const insertGroupChatMessage = async (chat: { from: string; message: string, type: string, to: string, sentTime:Date,members:string[]}) => {
  try {
    const msg = await Prisma.groupChat.create({
      data: {
        from:chat.from,
        message:chat.message,
        type:chat.type,
        to:chat.to,
        sentTime:chat.sentTime
      }
    })

    if (!msg) {
      return {
        success: false,
        result: null,
      };
    }
    return {
      success: true,
      msg: msg,
    };
  } catch (error) {
    console.log("error in getting messags");
    console.log(error);
    return {
      success: false,
      result: null,
    };
  }
}
