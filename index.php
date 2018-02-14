<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <link rel="stylesheet" href="css/upload.css">


</head>
<body>


<h3>File Upload</h3>

<div class="file-upload" id="dropzone"></div>

<div class="uploaded-files"></div>

<script src="js/jquery-3.3.1.min.js"></script>

<script src="js/uploader.js"></script>

<script>
    $('.file-upload').dropzone({
        url: 'upload.php',
        //fileType:'docx|png|jpg',
        error: function (errorCode) {
            console.log(errorCode)
        },
        progress: function (e) {
            console.log(e.lengthComputable);
            if (e.lengthComputable) {
                console.log(e.loaded / e.total * 100);
            }
        }
    });
</script>


</body>
</html>