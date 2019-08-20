module.exports =function({socket,db}){

    socket.on("find_contact", async (contact, fn) => {
        let query = null;
        try {
          query = db
            .collection("contacts")
            .findOne({ userName: { $regex: contact, $options: "i" } });
          fn(query)
     
        } catch (error) {
          console.log("mdb contacts error", error);
        }
      });
}