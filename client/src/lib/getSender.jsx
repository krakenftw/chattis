import { userModel } from "../../../api/schema/user.js";

export async function getSender(user, usersArray) {
  const filteredArray = usersArray.filter((each) => each != user);
  const sender = await userModel.findOne({
    _id: filteredArray[0]._id,
  });
  return sender;
}
