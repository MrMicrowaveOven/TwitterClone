var UsersSearch = function(el) {
  this.$el = $(el);
  this.input = this.$el.data("input");
  this.ul = this.$el.data("ul.users");
  this.$el.on("input", this.handleInput.bind(this));
};

UsersSearch.prototype.handleInput = function (e) {
  e.preventDefault();
  $.ajax ({
      url: "/users/search" + this.$el.data("input[value]"),
      type: "POST",
      dataType: "json",
      success: function (resp) {
        this.followState = "followed";
        this.render();
      }.bind(this)
    });
};
