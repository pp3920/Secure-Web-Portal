const passport = require("passport");

const GitHubStrategy =
require("passport-github2").Strategy;

const User =
require("../models/User");

passport.use(

  new GitHubStrategy(

    {
      clientID:
        process.env.GITHUB_CLIENT_ID,

      clientSecret:
        process.env.GITHUB_CLIENT_SECRET,

      callbackURL:
        process.env.GITHUB_CALLBACK_URL,
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {

      try {

        // Existing GitHub user?
        let user =
          await User.findOne({
            githubId:
              profile.id,
          });

        if (user) {
          return done(
            null,
            user
          );
        }

        const email =
          profile.emails?.[0]
            ?.value;

        // Existing local user?
        user =
          await User.findOne({
            email,
          });

        if (user) {

          user.githubId =
            profile.id;

          await user.save();

          return done(
            null,
            user
          );
        }

        // Create new user
        const newUser =
          await User.create({

            githubId:
              profile.id,

            username:
              profile.username,

            email,
          });

        done(
          null,
          newUser
        );

      } catch (error) {

        done(
          error,
          null
        );
      }
    }
  )
);

module.exports = passport;