CREATE TABLE   IF NOT EXISTS  `menu_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT, # 用户ID
  `name` varchar(64) DEFAULT NULL,    # 菜单名
  `link` varchar(64) DEFAULT NULL,    # 菜单链接
  `parentLayer` int(11) DEFAULT NULL,    # 菜单父级
  `sonLayer` int(11) DEFAULT NULL,    # 菜单子级
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# 插入默认信息 - 用户信息
INSERT INTO `menu_info` set name='个人设置', link='/info', parentLayer='1';
INSERT INTO `menu_info` set name='简历设置', link='/interview', parentLayer='1';
INSERT INTO `menu_info` set name='项目列表', link='/projects', parentLayer='1';