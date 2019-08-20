module.exports =function({socket,db}){
    socket.on("get_contacts", async (name, fn) => {
        let user = null;
        try {
          user = await db.collection("contacts").findOne({ name });
          if (user !== null) {
            fn(user.contacts);
          } else {
            user = await db.collection("contacts").insertOne({ name });
            fn(user.contacts);
          }
        } catch (error) {
          console.log("mdb contacts error", error);
        }
      });
}