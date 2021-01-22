/**
 *	须知:
 *		1.若需要使用数据库(MySQL)，请先配置`.env`文件中mysql相关配置，再创建数据库 `mpa`，数据库名只要和 `.env` 文件的 `MYSQL_DATABASE` 对应即可
 *		2.推荐使用navicat可视化工具，运行此文件即可创建数据表
 *
 */

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '123456');
INSERT INTO `user` VALUES ('2', 'admin', '123456');
