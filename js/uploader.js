(function () {

    $.fn.dropzone = function (_option) {

        this.each(function () {
            var $this = $(this),
                defOption = {
                    url: '',
                    fileType: 'docx|png|jpg|pdf|tif',
                    maxSize: '2MB',
                    method: 'POST',
                    contentType: false,
                    cache: false,
                    processData: false,

                    //function
                    dragOver: null,
                    dragLeave: null,
                    drop: null,
                    progress: null,
                    error: null,
                };

            var option = $.extend(defOption, _option);

            $this.on('dragover', function () {
                $(this).addClass('file-drag-over');

                if (typeof option.dragOver === 'function') {
                    option.dragOver.call(this);
                }

                return false;
            });

            // Drag Leave
            $this.on('dragleave', function () {
                $(this).removeClass('file-drag-over');

                if (typeof option.dragLeave === 'function') {
                    option.dragLeave.call(this);
                }

                return false;
            });

            // Drop
            $this.on('drop', function (e) {
                e.preventDefault();
                $(this).removeClass('file-drag-over');
                var formData = new FormData();
                var files = e.originalEvent.dataTransfer.files;

                for (var i = 0; i < files.length; i++) {

                    var checkType = new RegExp("\\.(" + option.fileType + ")$", "i");

                    if (!checkType.test(files[i].name)) {
                        //alert('Invalid file type');
                        if (typeof option.error === 'function') {
                            option.error.call(this,'ERROR_INVALID_FILE_TYPE');
                        }
                        return;
                    }

                    if (calMaxSize() < files[i].size) {
                        //alert('Max file size is ' + option.maxSize.toUpperCase());
                        if (typeof option.error === 'function') {
                            option.error.call(this,'ERROR_MAX_FILE_SIZE');
                        }
                        return;
                    }

                    formData.append('file[]', files[i]);
                }

                uploadData(formData, option);

            });

            function calMaxSize() {
                var type = new RegExp('\\D+').exec(option.maxSize)[0].toLowerCase();
                var size = new RegExp('\\d+').exec(option.maxSize)[0];

                var byte = 0;

                if (type === "mb") {
                    byte = size * 1024 * 1024;
                }

                return byte;
            }

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
                            if (typeof option.progress === 'function') {
                                option.progress.call(this,e);
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