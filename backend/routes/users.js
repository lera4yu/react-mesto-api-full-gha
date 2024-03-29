const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateAvatar, updateUser, getCurrentUser,
} = require('../controllers/users');
const { REGULAR_URL } = require('../utils/constants');

router.get('/', getUsers);
router.get('/me', getCurrentUser);

// router.get('/:id', getUser);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUser);

// router.patch('/me', updateUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

// router.patch('/me/avatar', updateAvatar);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(REGULAR_URL),
  }),
}), updateAvatar);

module.exports = router;
