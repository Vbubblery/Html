<?php
/** 
 * WordPress 基础配置文件。
 *
 * 本文件包含以下配置选项：MySQL 设置、数据库表名前缀、密钥、
 * WordPress 语言设定以及 ABSPATH。如需更多信息，请访问
 * {@link http://codex.wordpress.org/zh-cn:%E7%BC%96%E8%BE%91_wp-config.php
 * 编辑 wp-config.php} Codex 页面。MySQL 设置具体信息请咨询您的空间提供商。
 *
 * 这个文件用在于安装程序自动生成 wp-config.php 配置文件，
 * 您可以手动复制这个文件，并重命名为“wp-config.php”，然后输入相关信息。
 *
 * @package WordPress
 */

// ** MySQL 设置 - 具体信息来自您正在使用的主机 ** //
/** WordPress 数据库的名称 */
define('WP_CACHE', true); //Added by WP-Cache Manager
define( 'WPCACHEHOME', 'D:\wamp\www\MusicHouse\wp-content\plugins\wp-super-cache/' ); //Added by WP-Cache Manager
define('DB_NAME', 'Web');

/** MySQL 数据库用户名 */
define('DB_USER', 'Web');

/** MySQL 数据库密码 */
define('DB_PASSWORD', 'Web');

/** MySQL 主机 */
define('DB_HOST', 'localhost');

/** 创建数据表时默认的文字编码 */
define('DB_CHARSET', 'utf8');

/** 数据库整理类型。如不确定请勿更改 */
define('DB_COLLATE', '');

/**#@+
 * 身份认证密匙设定。
 *
 * 您可以随意写一些字符
 * 或者直接访问 {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org 私钥生成服务}，
 * 任何修改都会导致 cookie 失效，所有用户必须重新登录。
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '<$viyE`VwH~tqDtP$ZrcE`n|pY(51!$x6s|}UMw-*,[U`(cW|6ds}lPp[)0<&X71');
define('SECURE_AUTH_KEY',  '+3>~D3Qo-n>g5RO3}6vx(QL_Z3_}0lA7@yu2>,dvI &.k+l;Yr-]K@Y&U.9eU3|9');
define('LOGGED_IN_KEY',    'jkA)lV|eTc7W=Jqmo1u4-HlriGI+EOF<A;Pl$0jWn);OGlyR~@^i5u|E,W2a!mxV');
define('NONCE_KEY',        '(.YX/XZ}h?n?8eOg;m]qG^`z TV6.7mKT>3]_-pM<|gR!AW2n?c&j=KS.5,{q/t<');
define('AUTH_SALT',        '41|5J]KjAVN#sT#L$mNA5.wCH:c@=}f*l|LWhE$JC kK{ mz%#p tn%y}UlJ?&9E');
define('SECURE_AUTH_SALT', 'vHnV~Ct1Cc2:*+L[e#ug,;Hp_6er<%BtZFGr$J$F<I WZHD21U7J=%p6oippIIg>');
define('LOGGED_IN_SALT',   'AX{h7jP8v.__j@#p1iME~]:jqe|0wKyq`yfQgQVLAC2gAt$8>Pwc$a)x,gG!I(i}');
define('NONCE_SALT',       'J_9I|v6SePC=uJs?(Gn<^Q<M>08NTnwPGJS<>CANjz$hNz$?AA}g$viS~V7Y%qQR');

/**#@-*/

/**
 * WordPress 数据表前缀。
 *
 * 如果您有在同一数据库内安装多个 WordPress 的需求，请为每个 WordPress 设置不同的数据表前缀。
 * 前缀名只能为数字、字母加下划线。
 */
$table_prefix  = 'wp_';

/**
 * WordPress 语言设置，中文版本默认为中文。
 *
 * 本项设定能够让 WordPress 显示您需要的语言。
 * wp-content/languages 内应放置同名的 .mo 语言文件。
 * 要使用 WordPress 简体中文界面，只需填入 zh_CN。
 */
define('WPLANG', '');

/**
 * 开发者专用：WordPress 调试模式。
 *
 * 将这个值改为“true”，WordPress 将显示所有用于开发的提示。
 * 强烈建议插件开发者在开发环境中启用本功能。
 */
define('WP_DEBUG', false);

/* 好了！请不要再继续编辑。请保存本文件。使用愉快！ */

/** WordPress 目录的绝对路径。 */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** 设置 WordPress 变量和包含文件。 */
require_once(ABSPATH . 'wp-settings.php');
