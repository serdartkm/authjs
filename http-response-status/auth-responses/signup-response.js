export default {
  // 400 Bad Request
  BadRequest: {
    status: 400,
    USERNAME_TAKEN: { code: 4000, message: "username is taken" },
    EMAIL_TAKEN: {code: 4001, message: "email is taken" },
    EMAIL_USERNAME_TAKEN: {
      code: 4002,
      message: "email and user name already taken"
    }
  },
  // 204 No Content
  noContent: {
    status:204,
    PASSWORD_UPDATED: {
      message: "password updated"
    }
  },
  // 201 Created
  created: {
    status:201,
    SIGNUP_COMPLETE: {
      message: "signup complete"
    }
  }
};
