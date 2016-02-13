var FollowToggle = function(el) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.render();
  this.$el.on("click", this.handleClick.bind(this));
};

FollowToggle.prototype.render = function () {
  if (this.followState === "unfollowed") {
    this.$el.html("Follow!");
    this.$el.prop("disabled", false);
  } else if (this.followState === "followed"){
    this.$el.html("Unfollow!");
    this.$el.prop("disabled", false);

  } else if (this.followState === "unfollowing") {
    this.$el.html("Unfollowing...");
    this.$el.prop("disabled", true);
  } else if (this.followState === "following") {
    this.$el.html("Following...");
    this.$el.prop("disabled", true);

  } else {
    alert("follow state error");
  }
  // debugger;
};

FollowToggle.prototype.handleClick = function (e) {
  e.preventDefault();

  var notFollowing = (this.followState === "unfollowed");
  if (notFollowing) {
    this.followState = "following";
    this.render();
    $.ajax ({
      url: "/users/" + this.userId + "/follow",
      type: "POST",
      dataType: "json",
      // data:
      success: function (resp) {
        // debugger;
        this.followState = "followed";
        this.render();
        // this.followState = "followed";
        // this.render();

      }.bind(this)
    });
  } else {
    this.followState = "unfollowing";
    this.render();
    $.ajax ({
      url: "/users/" + this.userId + "/follow",
      type: "DELETE",
      dataType: "json",
      // data:
      success: function (resp) {
        this.followState = "unfollowed";
        this.render();
        // this.followState = "unfollowed";
        // this.render();

      }.bind(this)
    });
  }

};
module.exports = FollowToggle;
