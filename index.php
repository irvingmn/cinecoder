<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <?php  wp_head(); ?>
</head>
<body>
    <h1>hola miguel</h1>

    <li><a href="http://">ADIOS MIGUEL</a></li>
    <li><a href="http://">ADIOS MIGUEL</a></li>
    <li><a href="http://">ADIOS MIGUEL</a></li>
    <li><a href="http://">ADIOS MIGUEL</a></li>
    <li><a href="http://"><?php _e('hola miguelonnnnn','cinecoder'); ?></a></li>
    <p><?php _e('Fuckoff','cinecoder'); ?></p>
    <p>
    <?php  
    echo __('Adios Miguel','cinecoder'); ?>
    </p>
<?php  wp_footer(); ?>
</body>
</html>