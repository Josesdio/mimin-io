function setupForm(token) {
    $.ajaxSetup({
        headers: {
            'Authorization': "Bearer " + token,
            "Content-Type": "application/json",
        },
    });
}
function swalWaiting(gifWaiting) {
    Swal.fire({
        title: "Memeriksa...",
        text: "Harap menunggu",
        imageUrl: gifWaiting,
        showConfirmButton: false,
        allowOutsideClick: false,
    });
}
function dataTable(url, columns, lastColumn, ranges, options = {}) {
    var table = $("#datatable").DataTable({
        processing: true,
        serverSide: true,
        deferRender: true,
        ajax: {
            url: url,
            data: function (d) {
                d.start = 0;
                d.page = $("#datatable").DataTable().page.info().page + 1;
            },
        },
        columns: columns,
        start: 0,
        columnDefs: [
            {
                orderable: false,
                className: "select-checkbox",
                targets: 0,
            },
            {
                orderable: false,
                targets: lastColumn,
            },
        ],
        select: {
            style: "multi",
            selector: "td:first-child",
        },
        order: [[0, "asc"]],
        responsive: true,
        ...options,
        initComplete: function () {
            var tablename = "#datatable".replace(/[|&;$%@"<>()+#.,]/g, "");
            var num = 0;
            $(
                '<tr class="dt-filters" id="dt-filters-' + tablename + '"></tr>'
            ).appendTo($("#datatable").find("thead"));
            this.api()
                .columns()
                .every(function () {
                    var column = this;
                    var thisfilter = $("<th></th>").appendTo(
                        $("#dt-filters-" + tablename)
                    );
                    var textfilter = ranges;
                    var optionfilter = [];
                    // add text input filter
                    if (textfilter.includes(num)) {
                        $('<input type="text" style="width:100%"/>')
                            .appendTo(thisfilter)
                            .on("keyup", function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val()
                                );
                                column.search(val, false, true).draw();
                            });
                    }
                    // add option select filter
                    if (optionfilter.includes(num)) {
                        var select = $(
                            '<select><option value=""></option></select>'
                        )
                            .appendTo(thisfilter)
                            .on("change", function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val()
                                );
                                column
                                    .search(
                                        val ? "^" + val + "$" : "",
                                        true,
                                        false
                                    )
                                    .draw();
                            });
                        column
                            .data()
                            .unique()
                            .sort()
                            .each(function (d, j) {
                                // Detects and clears html tags from 'd' value
                                if (
                                    /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i.test(
                                        d
                                    )
                                ) {
                                    d = d.replace(/(<([^>]+)>)/gi, "");
                                }
                                select.append(
                                    '<option value="' +
                                        d +
                                        '">' +
                                        d +
                                        "</option>"
                                );
                            });
                    }
                    num++;
                });
            // DataTable select all/deselect all row checkbox
            $("#datatable").find(".table-checkbox").html("");
            $(
                '<input type="checkbox" name="dtcheckall" id="dtcheckall-' +
                    tablename +
                    '" class="dtcheckall"><label for="dtcheckall-' +
                    tablename +
                    '"></label>'
            )
                .appendTo($("#datatable").find(".table-checkbox"))
                .on("change", function () {
                    if ($(this).is(":checked")) {
                        table.rows().select();
                    } else {
                        table.rows().deselect();
                    }
                });
        },
    });
    // DataTable Show/Hide Multiple Row Operation Buttons
    table.on("select", function (e, dt, type, indexes) {
        if (type === "row") {
            if (table.rows(".selected").data().length > 0) {
                $(".datatable-multibuttons").addClass("active");
                $(".datatable-multibuttons-label").text(
                    table.rows(".selected").data().length + " row(s) selected"
                );
            } else {
                $(".datatable-multibuttons").removeClass("active");
            }
        }
    });
    table.on("deselect", function (e, dt, type, indexes) {
        if (type === "row") {
            if (table.rows(".selected").data().length <= 0) {
                $(".datatable-multibuttons").removeClass("active");
            } else {
                $(".datatable-multibuttons-label").text(
                    table.rows(".selected").data().length + " row(s) selected"
                );
            }
        }
    });
    // DataTable select all/deselect all row checkbox
    $(".dtcheckall").on("click", function (e) {
        if (table.is(":checked")) {
            table.rows().select();
        } else {
            table.rows().deselect();
        }
    });
}
function validation(id) {
    $("#" + id)
        .find(".form-control")
        .each(function () {
            if ($(this).prop("required")) {
                if ($(this).val() === "") {
                    $("#required_" + $(this).attr("id")).html(
                        '<font class="error_message" id="error_' +
                            $(this).attr("id") +
                            '" color="#FF0000">Harus diisi</font>'
                    );
                } else {
                    if ($("#required_" + $(this).attr("id")).length > 0) {
                        $("#error_" + $(this).attr("id")).remove();
                    }
                }
            }
        });
}
function validation_dynamic(id) {
    $("#" + id)
        .find(".form-control")
        .each(function () {
            if ($("#isVarian").prop("checked") == true) {
                if ($(this).prop("required")) {
                    if ($(this).val() === "") {
                        $("#required_" + $(this).attr("id")).html(
                            '<font class="error_message" id="error_' +
                                $(this).attr("id") +
                                '" color="#FF0000">Harus diisi</font>'
                        );
                    } else {
                        if ($("#required_" + $(this).attr("id")).length > 0) {
                            $("#error_" + $(this).attr("id")).remove();
                        }
                    }
                }
            } else {
                if (!$(this).hasClass("data-varian")) {
                    if ($(this).prop("required")) {
                        if ($(this).val() === "") {
                            $("#required_" + $(this).attr("id")).html(
                                '<font class="error_message" id="error_' +
                                    $(this).attr("id") +
                                    '" color="#FF0000">Harus diisi</font>'
                            );
                        } else {
                            if (
                                $("#required_" + $(this).attr("id")).length > 0
                            ) {
                                $("#error_" + $(this).attr("id")).remove();
                            }
                        }
                    }
                }
            }
        });
}
function validationEdit(id) {
    $("#" + id)
        .find(".form-control")
        .each(function () {
            if ($(this).prop("required")) {
                if ($(this).val() === "") {
                    $("#required_" + $(this).attr("id")).html(
                        '<font class="error_message_edit" id="error_' +
                            $(this).attr("id") +
                            '" color="#FF0000">Harus diisi</font>'
                    );
                } else {
                    if ($("#required_" + $(this).attr("id")).length > 0) {
                        $("#error_" + $(this).attr("id")).remove();
                    }
                }
            }
        });
}
function dataSave(url, idForm, gifWaiting, cb) {
    $(document).on("click", ".save", function (e) {
        e.stopPropagation();
        let id = $(this).attr("id");
        validation(id);

        if ($(".error_message").length === 0) {
            swalWaiting(gifWaiting);

            let datas = {};
            let datasgroup = [];

            $("#" + idForm)
                .find(".form-control")
                .each(function () {
                    let group = $(this).attr("group");
                    let type = $(this).attr("type");
                    var groupvalue = $(this).attr("groupvalue");

                    if (groupvalue) {
                        datasgroup.push({
                            trigger_type: groupvalue,
                            trigger_value: $("#" + $(this).attr("id")).val(),
                        });

                        datas[group] = datasgroup;
                    } else if (group) {
                        let groupObject = datas[group];

                        if (groupObject === undefined) {
                            datas[group] = {};
                        }

                        datas[group][$("#" + $(this).attr("id")).attr("name")] =
                            $("#" + $(this).attr("id")).val();
                    } else {
                        datas[$("#" + $(this).attr("id")).attr("name")] = $(
                            "#" + $(this).attr("id")
                        ).val();
                    }

                    if (type == "file") {
                        var reader = new FileReader();
                        var f = document.getElementById(
                            $(this).attr("id")
                        ).files;
                        reader.onloadend = function () {
                            var result = reader.result.replace(
                                /^data:.+;base64,/,
                                ""
                            );
                            if (group) {
                                datas[group][
                                    $("#" + $(this).attr("id")).attr("name")
                                ] = result;
                            } else {
                                datas[
                                    $("#" + $(this).attr("id")).attr("name")
                                ] = result;
                            }
                        };
                        reader.readAsDataURL(f[0]);
                    }
                });

            $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(datas),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    // return Swal.close()

                    Swal.fire({
                        title: "Success",
                        icon: "success",
                        text: "Data has been saved.",
                    }).then((result) => {
                        $("#datatable").DataTable().ajax.reload();
                    });

                    $("#" + idForm)
                        .find(".form-control")
                        .each(function () {
                            $("#" + $(this).attr("id")).val("");
                        });

                    if (id == "save") {
                        $(".modal-create").modal("hide");
                    }

                    cb();
                },
                error: function (errors) {
                    console.log(errors);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: errors.responseJSON.message,
                    });
                },
            });
        }
    });
}
function dataDelete(url, gifWaiting, cb) {
    $(document).on("click", ".button-delete", function (e) {
        e.stopPropagation();
        let id = $(this).data("id");
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                swalWaiting(gifWaiting);
                $.ajax({
                    url: url + id,
                    type: "PATCH",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Data has been deleted.",
                            icon: "success",
                        }).then((result) => {
                            $("#datatable").DataTable().ajax.reload();
                            $(".datatable-multibuttons").removeClass("active");
                        });
                    },
                    error: function (errors) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: errors.responseJSON.message,
                        });
                    },
                });
            }
        });
    });
    $(".datatable-deleterows").click(function (e) {
        e.stopPropagation();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                var tables = $("#datatable").DataTable();
                swalWaiting(gifWaiting);
                var data = $.map(
                    tables.rows(".selected").data(),
                    function (value) {
                        let id = value._id;
                        $.ajax({
                            url: url + id,
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (response) {},
                            error: function (errors) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: errors.responseJSON.message,
                                });
                            },
                        });
                    }
                );
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Data has been deleted.",
                    icon: "success",
                }).then((result) => {
                    $("#datatable").DataTable().ajax.reload();
                    $(".datatable-multibuttons").removeClass("active");

                    cb();
                });
            }
        });
    });
}
function timeago(val) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(val);
    const secondDate = new Date();
    countDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    return countDays == 0 ? "Hari Ini" : countDays + " Hari yang lalu";
}

const loader = () => {
    Swal.fire({
        title: "Memeriksa...",
        text: "Harap menunggu",
        imageUrl: "/waiting.gif",
        showConfirmButton: false,
        allowOutsideClick: false,
    });
};

const replaceBulk = (str, findArray, replaceArray) => {
    var i,
        regex = [],
        map = {};
    for (i = 0; i < findArray.length; i++) {
        regex.push(findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g, "\\$1"));
        map[findArray[i]] = replaceArray[i];
    }
    regex = regex.join("|");
    str = str.replace(new RegExp(regex, "g"), function (matched) {
        return map[matched];
    });
    return str;
};

const convertToSlug = (Text) =>
    Text.toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
