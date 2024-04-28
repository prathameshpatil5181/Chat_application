import Prisma from "../Prisma";

export const InsertMessage = async (
  message: string,
  type: string,
  from: string,
  to: string
) => {
  const currenDate = new Date();
  console.log(currenDate.toISOString());

  try {
    const result = await Prisma.messages.create({
      data: {
        message: message,
        type: type,
        from: from,
        to: to,
        sentTime: currenDate,
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
    console.log("error in InsertMessage to insertMessage");
    console.log(error);
    return {
      success: false,
      result: null,
    };
  }
};

export const getAllMessages = async (id: string) => {
  try {
    const result = await Prisma.messages.findMany({
      orderBy: [
        {
          sentTime:'asc'
        }
      ],
      select: {
        from: true,
        to: true,
        message: true,
        sentTime: true,
        type: true,
      },
      where: {
        OR: [
          {
            from: id,
          },
          {
            to: id,
          },
        ],
      },
    });

    if (!result) {
      return {
        success: false,
        result: null,
      };
    }

    let messages: {
      from: string;
      to: string;
      message: string;
      sentTime: Date;
      type: string;
      self: boolean;
    }[]=[];

    result.forEach((element) => {
      messages.push({
        from: element.from === id ? element.to : element.from,
        to: element.to === id ? element.to : element.from,
        message: element.message,
        sentTime: element.sentTime,
        type: element.type,
        self: element.from === id ? true : false,
      });
    });

    return {
      success: true,
      result: messages,
    };
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return {
      success: false,
      message:"An error occurred while retrieving messages",
      error: error,
    };
  }
};
