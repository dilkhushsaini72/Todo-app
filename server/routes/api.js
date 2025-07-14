const router = require("express").Router();
const taskController = require("../controllers/taskController");
const userControllers = require("../controllers/userControllers");

router.post("/create-task", taskController.createTaskController);
router.get("/show-task", taskController.showAllTaskController);
router.delete("/delete-task", taskController.deleteTaskController);
router.put("/update-task", taskController.updateTaskController);
router.get("/getsingledata/:id", taskController.getSingleDataController);

router.post("/reg-user", userControllers.userRegController);
router.post("/login-user", userControllers.userLoginController);

module.exports = router;
