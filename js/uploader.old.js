(function () {

    $.fn.dropzone = function (_option) {

        this.each(function () {
            var $this = $(this),
                defOption = {
                    url: '',
                   // fileType: 'docx,png,jpg',
                    method: 'POST',
                    contentType: false,
                    cache: false,
                    processData: false
                };

            var option = $.extend(defOption, _option);

            $this.on('dragover', function () {
                $(this).addClass('file-drag-over');
                return false;
            });

            // Drag Leave
            $this.on('dragleave', function () {
                $(this).removeClass('file-drag-over');
                return false;
            });

            // Drop
            $this.on('drop', function (e) {
                e.preventDefault();
                $(this).removeClass('file-drag-over');
                var formData = new FormData();
                var files = e.originalEvent.dataTransfer.files;

                for (var i = 0; i < files.length; i++) {
                    var fileName = files[i].name;
                    // var checkType = new RegExp("\\.(" + option.fileType + ")$", "i");
                    // var checkType = new RegExp("\\.(docx)$", "i");
                    // console.log(checkType);
                    // console.log(checkType.test(fileName));

                    // if (!(/\.(gif|jpg|jpeg|tiff|png|docx)$/i).test(files[i].name)) {
                    //     alert('You must select an image file only');
                    // }
                    //
                    // if (!checkType.test(fileName))
                    //     return;

                    formData.append('file[]', files[i].name);
                }

                uploadData(formData, option);

            });

            function uploadData(formData, obj) {
                $.ajax({
                    url: obj.url,
                    method: obj.method,
                    data: formData,
                    contentType: obj.contentType,
                    cache: obj.cache,
                    processData: obj.processData,
                    xhr: function () {
                        var xhr = $.ajaxSettings.xhr();
                        xhr.upload.onprogress = function (e) {
                            if (e.lengthComputable) {
                                console.log(e.loaded / e.total);
                            }
                        };
                        return xhr;
                    },
                    success: function (res) {
                        $('.uploaded-files').html(res);
                    }
                })
            }
        });

    };

})();