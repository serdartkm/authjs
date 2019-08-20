module.exports = function({ socket, db }) {
  const userName =socket.userName
  socket.on("add_contact", async (contact,fn) => {
    let addContact =null;
    try {
     addContact=  await db
        .collection("contacts")
        .findAndUpdate({ userName }, { $push: { contacts: targetName } });
      fn(addContact)
    } catch (error) {
      console.log("error inserting contact", error);
    }
  });
};
