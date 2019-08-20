module.exports = async function({socket,db,name}) {

    let user = null;
    try {
      user = await db.collection("contacts").findOne({ name });
      //sent to contacts online statechange
      if (user !== null && user.contacts !== null) {
        const contacts = user;
        contacts.foreach(c => {
          console.log("Emit joint");
          socket.to(c).emit("online", c);
        });
      }
    } catch (error) {
      console.log("mdb contacts error", error);
    }
}