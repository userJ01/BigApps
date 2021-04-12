
    /**Data Table Of Categories -Start */
    function tblCategories() {
        table = $('#table').DataTable({
            "processing": true,
            "serverSide": false,
            "deferRender": true,
            "destroy": true,
            "data": data_Set,
            "lengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
            "columns": [
                {
                    "orderable": true,
                    "data": "title",
                    render: function (data, type, row, meta) {
                        return data;
                    }
                },
                { 
                    "data": "enable" ,
                    "orderable": false,
                    "defaultContent": "",
                    render: function (data, type, row, meta) {
                        return ' <input type="checkbox" disabled="disabled" checked="'+row.enable+'" />';
                    }
                },
                {
                    "orderable": false,
                    "data": "Picture",
                    "defaultContent": "",
                    render: function (data, type, row, meta) {
                        return '<img src="' + row.picture+'" width="100" alt="" title="" />';
                    }
                },
                { "data": "created" },
                {
                    "data": "Products",
                    "class": "details-control",
                    render: function (data, type, row, meta) {
                        return '<span class="details-control" catid="' + row.id +'"></span>';
                    }
                },
                {
                    "orderable": false,
                    "data": "",
                    "defaultContent": "",
                    render: function (data, type, row, meta) {
                       // console.log(data, type, row, meta)
                        var html = "";
                        html += '<button id="EditCategoryOne" onclick="CategoryOne(\'Edit\')" itemid="'+ row.id+'" type="button" class=" btn btn-light btn-sm" data-toggle="modal" data-target="#exampleModalLong">';
                        html += '    Edit';
                        html += '</button>';
                        html += '<button id="DetailsCategoryOne" onclick="CategoryOne(\'Details\')" itemid="' + row.id+'" type="button" class="CategoryOne btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModalLong">';
                        html += '        Details';
                        html += '</button>';
                        html += '<button id="DeleteCategoryOne" onclick="CategoryOne(\'Delete\')" itemid="' + row.id+'" type="button" class="CategoryOne btn btn-danger btn-sm" data-toggle="modal" data-target="#exampleModalLong">';
                        html += '         Delete';
                        html += '</button>';
                        return html;
                    }
                }
            ],
            "initComplete": function (settings, json) {
                $("#table_filter").append('<label>Search:<input name="search_server" id="search_server" type="text" class="form-control form-control-sm" placeholder="By Cat Name" aria-controls="table"></label>');
                    $('#search_server').keypress(function (event) {
                        var keyCode = (event.keyCode ? event.keyCode : event.which);
                        if (keyCode == 13)  /*the enter key code*/
                        {
                            Search(jQuery("#search_server").val());
                        }
                        event.stopPropagation();
                    });
            },
            "order": [[0, 'asc']]
        });

        var detailRows = [];

        $('#table tbody').on('click', 'tr td.details-control', function () {
            var tr = $(this).closest('tr');
            var CatID = $(this).children().attr("catid");
            var row = table.row(tr);
            var idx = $.inArray(tr.attr('id'), detailRows);

            if (row.child.isShown()) {
                tr.removeClass('details');
                row.child.hide();

                // Remove from the 'open' array
                detailRows.splice(idx, 1);
            }
            else {
                tr.addClass('details');
                row.child(ShowProduct(CatID)).show();
                // Add to the 'open' array
                if (idx === -1) {
                    detailRows.push(tr.attr('id'));
                }
            }
        });

        // On each draw, loop over the `detailRows` array and show any child rows
        table.on('draw', function () {
            $.each(detailRows, function (i, id) {
                $(('#' + id + ' td.details-control')).trigger('click');
            });
        });
        ////end table roduct
    }
    /**Data Table Of Categories -End */

    /** Showing List Of Products ->Start<-*/
    function ShowProduct(d) {
        var id = 'Products' + d;
        var html = "<div id='" + id + "' style='border: 1px #cecece solid;margin: 2px;'><img src='../../images/loader.gif' /></div>";
        var url = ('product.html?id=' + d);
        
        $.get(url, function (data) {
            //debugger;
            $(('#' + id)).html(data);
            data_SetProd = getTblData("getproducts", d);
        }).fail(function (jqxhr, settings, ex) { alert('failed, ' + ex); });
        return html;
    }
    /** Showing List Of Products ->End<-*/

    /**Data Table Of Products -Start */
    function tblProducts() {
        table = $('#tableproduct').DataTable({
            "processing": false,
            "serverSide": false,
            "deferRender": true,
            "destroy": true,
            "data": data_SetProd,
            "lengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
            "columns": [
                {
                    "orderable": true,
                    "data": "title",
                    render: function (data, type, row, meta) {
                        return data;
                    }
                },
                { 
                  "data": "catid",
                    render: function (data, type, row, meta) {
                        return data;
                    }
                },
                { 
                    "data": "enable" ,
                    "orderable": false,
                    "defaultContent": "",
                    render: function (data, type, row, meta) {
                        return ' <input type="checkbox" disabled="disabled" checked="'+row.enable+'" />';
                    }
                 },
                {
                    "orderable": false,
                    "data": "picture",
                    "defaultContent": "",
                    render: function (data, type, row, meta) {
                      return '<img src="' + row.picture+'" width="100" alt="" title="" />';
                    }
                },
                { "data": "created" },
                {
                    "orderable": false,
                    "data": "",
                    "defaultContent": "",
                    render: function (data, type, row, meta) {
                        //console.log(data, type, row, meta)
                        var html = "";
                        html += '<button id="EditCategoryOne" onclick="CategoryOne(\'Edit\')" itemid="' + row.id + '" type="button" class=" btn btn-light btn-sm" data-toggle="modal" data-target="#exampleModalLong">';
                        html += '    Edit';
                        html += '</button>';
                        html += '<button id="DetailsCategoryOne" onclick="CategoryOne(\'Details\')" itemid="' + row.id + '" type="button" class="CategoryOne btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModalLong">';
                        html += '        Details';
                        html += '</button>';
                        html += '<button id="DeleteCategoryOne" onclick="CategoryOne(\'Delete\')" itemid="' + row.id + '" type="button" class="CategoryOne btn btn-danger btn-sm" data-toggle="modal" data-target="#exampleModalLong">';
                        html += '         Delete';
                        html += '</button>';
                        return html;
                    }
                }
            ],
            "initComplete": function (settings, json) {
            },
            "order": [[0, 'asc']]
        });

        var detailRows = [];

        $('#table tbody').on('click', 'tr td.details-control', function () {
            var tr = $(this).closest('tr');
            var CatID = $(this).children().attr("catid");
            var row = table.row(tr);
            var idx = $.inArray(tr.attr('id'), detailRows);

            if (row.child.isShown()) {
                tr.removeClass('details');
                row.child.hide();
                // Remove from the 'open' array
                detailRows.splice(idx, 1);
            }
            else {
                tr.addClass('details');
                // Add to the 'open' array
                if (idx === -1) {
                    detailRows.push(tr.attr('id'));
                }
            }
        });

        // On each draw, loop over the `detailRows` array and show any child rows
        table.on('draw', function () {
            $.each(detailRows, function (i, id) {
                $(('#' + id + ' td.details-control')).trigger('click');
            });
        });
        ////end table roduct
    }
    /**Data Table Of Products -End */
    
    /** Get Data Table Of Categories OR Product Start*/
    function getTblData(MethodName, params) {
        var u=(location.protocol+'//'+window.location.host+'/api?method=');
        debugger;
        if (MethodName === undefined) {
            u+='getcategories';
            $.ajax({
                type: "GET",
                url: u,
                contentType: "application/json; charset=utf-8",
                headers: { "X-Method": MethodName, "x-id":params},
                data: JSON.stringify(params),
                success: function (data) {
                    data_Set = data;
                    HideLoad();
                    tblCategories();
                }, statusCode: {
                    400: function () { $('.modal-body').html(status_400); },
                    404: function () { $('.modal-body').html(status_404); },
                    500: function () { $('.modal-body').html(status_500); }
                }, error: function (xhr, status, error) {

                 }
            });
            // fetch(opts.url)
            //      .then((res) => {
            //          if (res.ok) {
            //              return res.json();
            //          }
            //       })
            //       .then((rows) => {
            //         data_Set = rows;
            //         HideLoad();
            //         tblCategories();
            //           for (let row of rows) {
            //             console.log(row);
            //           }
            //        })
            //        .catch(console.log);
        } else {
            // fetch(opts.url)
            //      .then((res) => {
            //          if (res.ok) {
            //              return res.json();
            //          }
            //       })
            //       .then((rows) => {
            //         data_SetProd = data;
            //         HideLoad();
            //         tblProducts();

            //           for (let row of rows) {
            //             console.log(row);
            //           }
            //        })
            //        .catch(console.log);
            u+=MethodName;
             $.ajax({
                 type: "GET",
                 url: u,
                 contentType: "application/json; charset=utf-8",
                 headers: { "X-Method": MethodName, "x-id":params},
                 data: JSON.stringify(params),
                 success: function (data) {
                     data_SetProd = data;
                     HideLoad();
                     tblProducts();
                 }, statusCode: {
                     400: function () { $('.modal-body').html(status_400); },
                     404: function () { $('.modal-body').html(status_404); },
                     500: function () { $('.modal-body').html(status_500); }
                 }, error: function (xhr, status, error) { }
             });
        }
        return data_Set;
    }
    /** Get Data Table Of Categories OR Product End*/

    /** Contains Cuple function Start*/
    function AdditionalFunc() {
        ///
        jQuery('#CreateCategory').click(function () {
            var url = '../Create_Category.html';
            $.get(url, function (data, textStatus, jqXHR) {
                $('.modal-body').html(data); $('#ModalCategory').modal('show');
                $('.modal-title').text('Create');
                Onsubmitcategoy();

            }).fail(function (jqxhr, settings, ex) { alert('failed, ' + ex); });
        });
        $("#ModalCategory").on("hidden.bs.modal", function () { $('#ModalCategory').hide(); $('.modal-body').css("text-align", "inherit");        });
        jQuery('#RefreshTbl').click(function () {
            getTblData();
        });
         
    }
    /** Contains Cuple function End*/

    /**Send Obj Of Cat Start */
    function Onsubmitcategoy() {
        $('#submitcategoy').on('click', function (e) {
            e.preventDefault();

            var fileUpload = $("#filecategoy").get(0);
            var files = fileUpload.files;
            var formData = {};
            // Create FormData object
            var fileData = new FormData();

            // Looping over all files and add it to FormData object
            for (var i = 0; i < files.length; i++) {
                fileData.append(files[i].name, files[i]);
            }

            fileData.append("file", fileData);
            var name=$("#Name").val();
            fileData.append("name",name);
            var enabled=$('#enabled').is(":checked");
            fileData.append("enabled",enabled);
            debugger;
            $.ajax({
                url: '../fileupload',
                type: "POST",
                contentType: false, // Not to set any content header
                processData: false, // Not to process data
                data: fileData,
                headers: { "X-Method": "UloadImage"},
                success: function (result) {
                   if( result.status)
                   {
                    HideLoad();
                    getTblData();
                   }
                   else if(!result.status){
                    alert(err.status);
                   }
                },
                error: function (err) {
                    alert(err.status);
                }
            });

        });

    }
    /**Send Obj Of Cat End */

    /**For Buttons(Edit, Ditails, Delete) Start*/
    function CategoryOne(type) {
        if (type == 'Details') {
            var url = '../Details_Category.html';
            $.get(url, function (data, textStatus, jqXHR) {
                $('.modal-body').html(data);
                $('#ModalCategory').modal('show');
                $('.modal-title').text('Details');
            }).fail(function (jqxhr, settings, ex) { alert('failed, ' + ex); });
        }
        else if (type == 'Edit') {
            var url = '../Create_Category.html';
            $.get(url, function (data, textStatus, jqXHR) {
                $('.modal-body').html(data);
                $('#ModalCategory').modal('show');
                $('.modal-title').text('Edit ');
            }).fail(function (jqxhr, settings, ex) { alert('failed, ' + ex); });
        }
        else if (type == 'Delete') {
            alert();
        }
    }
    /**For Buttons(Edit, Ditails, Delete) End*/

    /**Search Button Start*/
    function Search(value) {
       // console.log(value);
        $.ajax({
            type: "POST",
            url: "Handler1.ashx?Method=Ge" + new Date().getUTCMilliseconds(),
            contentType: "application/json; charset=utf-8",
            headers: { "X-Method": "Search", "x-id": value },
            success: function (data) {
                data_Set = data;
                tblCategories();
            }
        });
    }
    /**Search Button End*/
