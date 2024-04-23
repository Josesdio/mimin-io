const datePickerFormat = "Y/m/d";

// Template pesan WA dengan menggunakan token field database
const templatePesan = () => {
    // Fake data
    const customers = {
        name: "Franky",
        phone: "089677788873",
        address: "Jln. Kapuk Raya No. 24A",
        province_name: "DKI Jakarta",
        city_name: "Jakarta Utara",
        suburb_name: "Penjaringan",
        area_name: "Kapuk Muara",
    };

    // Tokens
    const tokens = [];
    const tokens2 = [];
    const tokens3 = [];
    const onlyThisToken = [
        "name",
        "phone",
        "address",
        "province_name",
        "city_name",
        "suburb_name",
        "area_name",
    ];

    Object.keys(customers).forEach((k, v) => {
        if ($.inArray(k, onlyThisToken) !== -1) {
            tokens.push(`<span>[${k}]</span>`);
            tokens2.push(`[${k}]`);
            tokens3.push(k);
        }
    });

    $("#tokens").html(tokens.join(" "));
    const replacement = tokens3.map((v) => customers[v]);

    $(document).on("click", "#tokens span", function () {
        const token = $(this).text();
        const pesan = $("textarea.description").val();

        const newPesan = pesan + token;
        $("textarea.description").val(newPesan).trigger("propertychange");
    });

    // Textarea
    RegExp.quote = function (str) {
        return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    };

    $("textarea.description").bind("input propertychange", function () {
        const text = $(this).val();
        const newText = replaceBulk(text, tokens2, replacement);

        $(".template-pesan-preview").html(newText);
    });
};

// Tambah filter baru
const tambahFilter = () => {
    $(document).on("click", "#add-more-filter", function () {
        const no = $(".row-filter").length + 1;

        const filterDiv = `
        <div class="row row-filter" id="row-filter-${no}">
            <div class="col-5 filter-main-${no}">
                <div class="form-group">
                    <label>Filter</label>
                    <select class="form-control select-filter" id="select-filter-${no}" data-id="${no}" required></select>
                </div>
            </div>

            <div class="col-5 filter-main-${no}" id="filter-kanan-${no}" data-id="${no}"></div>

            <div class="col-2 filter-main-${no} text-right align-self-center">
                <button type="button" class="crmitemformdelete btn delete-varian" id="btn-delete-varian-${no}" data-id="${no}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        `;

        $(".automation-filter .filter-container").append(filterDiv);

        $(`#select-filter-${no}`).select2({
            data: opsiFilterKiri(),
            minimumResultsForSearch: -1,
        });

        filterKiriEventHandler();
    });
};

// Hapus filter
const hapusFilter = () => {
    $(document).on("click", ".delete-varian", function () {
        const no = $(this).data("id");
        $(`#row-filter-${no}`).remove();
    });
};

// Opsi filter kiri
const opsiFilterKiri = () => {
    let opsiDefault = {
        id: 0,
        text: "- Pilih Trigger- ",
        disabled: true,
        selected: true,
    };
    let opsi = [
        "Tanggal Pembelian",
        "Tanggal Transaksi",
        "Tanggal Ulang Tahun",
    ];

    opsi = _.map(opsi, (v, k) => {
        return { id: convertToSlug(v), text: v };
    });
    opsi = _.sortBy(opsi, ["text"]);
    opsi.unshift(opsiDefault);

    return opsi;
};

const opsiFilterKiri2 = () => {
    let opsi = [
        "Tanggal Pembelian",
        "Tanggal Transaksi Selesai",
        "Tanggal Ulang Tahun",
    ];

    opsi = _.map(opsi, (v, k) => {
        return { id: convertToSlug(v), text: v };
    });
    opsi = _.sortBy(opsi, ["text"]);

    return opsi;
};

// Setelah pilih filter kiri mw ngapain
const filterKiriEventHandler = () => {
    let filterKanan = "";
    let doneCb = () => {};

    let finalCb = (no, filterKanan) => {
        $(`#filter-kanan-${no}`).html(filterKanan);
        doneCb();
    };

    // on select
    $(".select-filter").on("select2:select", function () {
        const no = $(this).data("id");
        const slug = $(this).val();
        const text = $("option:selected", this).text();
        const apiUrl = $("#api-url").val();

        // Kalo udah di select, ga bs di select lagi
        const exist = _.filter(
            $(".select-filter"),
            (v) => $("option:selected", v).val() == slug
        );

        if (exist.length >= 2) {
            $(this).val(0).trigger("change");
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Filter ini sudah ada! Mohon untuk memilih filter lain.",
            });
        }

        // Append filter kanan
        if (slug == "jumlah-pembelian") {
        } else if (slug == "jenis-produk") {
            $.ajax({
                url: apiUrl + "/product/get?order=name",
                beforeSend: () => loader(),
                success: (res) => {
                    const { data } = res;
                    Swal.close();

                    const kategoriProduk = _.map(data, (v) => {
                        return {
                            id: v._id,
                            text: v.name,
                        };
                    });

                    filterKanan = `
                    <div class="form-group">
                        <label>${text}</label>
                        <select name="${slug}" id="${slug}" class="form-control">
                            <option></option>
                        </select>
                    </div>
                    `;

                    doneCb = () => {
                        $("#" + slug).select2({
                            data: kategoriProduk,
                            placeholder: "Pilih Jenis Produk",
                        });
                    };

                    finalCb(no, filterKanan);
                },
                error: function (errors) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: errors.responseJSON.message,
                    });
                },
            });
        } else if (slug == "kategori-produk") {
            $.ajax({
                url: apiUrl + "/product-category/get?order=name",
                beforeSend: () => loader(),
                success: (res) => {
                    const { data } = res;
                    Swal.close();

                    const kategoriProduk = _.map(data, (v) => {
                        return {
                            id: v._id,
                            text: v.name,
                        };
                    });

                    filterKanan = `
                    <div class="form-group">
                        <label>${text}</label>
                        <select name="${slug}" id="${slug}" class="form-control">
                            <option></option>
                        </select>
                    </div>
                    `;

                    doneCb = () => {
                        $("#" + slug).select2({
                            data: kategoriProduk,
                            placeholder: "Pilih Kategori Produk",
                        });
                    };

                    finalCb(no, filterKanan);
                },
                error: function (errors) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: errors.responseJSON.message,
                    });
                },
            });
        } else if (
            _.includes(
                [
                    "tanggal-check-in",
                    "tanggal-check-out",
                    "tanggal-pembelian",
                    "tanggal-transaksi",
                    "tanggal-ulang-tahun",
                ],
                slug
            )
        ) {
            filterKanan = `
            <div class="form-group">
                <label>${text}</label>
                <input type="text" name="${slug}" id="${slug}" class="form-control" placeholder="Input ${text}">
            </div>
            `;
            doneCb = () =>
                flatpickr(`#${slug}`, {
                    mode: "range",
                    dateFormat: datePickerFormat,
                });
            finalCb(no, filterKanan);
        }
    });
};

// Simpan data
const save = () => {
    $(document).on("click", "#save", async function (e) {
        try {
            e.stopPropagation();
            e.preventDefault();

            const _id = $("#id").val();
            const name = $("#name").val();
            const trigger = $("#trigger").val();
            const periode = $("#periode").val();
            const h_type = $("#h_type").val();
            const h_time = $("#h_time").val();
            let h_number = $("#h_number").val();
            const end_date = $("#end_date").val();
            const description = $("#description").val();
            const is_activated = $("#is_activated").val();
            const dijalankan = $("#dijalankan").val();
            const filter = {};
            const apiUrl = $("#api-url").val();
            const mediaBase64 = $("#media-base64").val();
            const mediaName = $("#mediaName").val();

            const mediaFile = document.getElementById("media").files[0];
            const media = mediaFile ? await toBase64(mediaFile) : mediaBase64;

            h_number = h_number == "" || h_number < 0 ? 0 : h_number;

            // Validasi
            if (!name)
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Nama automation tidak boleh kosong!",
                });
            if (!description)
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Template pesan tidak boleh kosong!",
                });
            if (!trigger)
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Trigger tidak boleh kosong!",
                });
            if (!periode)
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Periode tidak boleh kosong!",
                });
            if (!h_time)
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Automation mau dijalankan jam berapa?",
                });
            if (h_number <= 0)
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Jumlah H+ harus diatas 0!",
                });

            // Mapping value filter
            _.chain(opsiFilterKiri())
                .omit([0])
                .each((v, k) => {
                    const { id, text } = v;
                    const value = $("#" + id).val();

                    if (value) filter[id] = value;
                })
                .value();

            // Data untuk dikirim ke ajax
            const formDatas = {
                _id,
                name,
                description,
                is_activated,
                filter,
                trigger,
                periode,
                h_type,
                h_number,
                h_time,
                dijalankan,
                end_date,
                media,
                mediaName,
            };
            // console.log(formDatas)

            // Ajax ke API create automation
            $.ajax({
                method: "post",
                // url: '/automation/save',
                url: apiUrl + "/automation/create",
                data: JSON.stringify(formDatas),
                beforeSend: () => {
                    loader();
                },
                success: (res) => {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Data has been saved.',
                    }).then((result) => {
                        location.reload();
                    });
                },
                error: function (xhr, status, errorThrown) {
                    Swal.fire({
                        title: "Error",
                        text: errorThrown,
                        icon: "error",
                    });
                },
            });
        } catch (err) {
            console.log(err);
        }
    });
};

// Edit data
const edit = () => {
    $(document).on("click", ".btn-edit", function (e) {
        e.stopPropagation();
        loader();

        const id = $(this).data("id");

        $.ajax({
            url: "/automation/call-edit-api/" + id,
            type: "get",
            success: (res) => {
                editCallback(res).catch((e) => console.log(e));
            },
            error: function (errors) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errors.responseJSON.message,
                });
            },
        });
    });
};

const editCallback = async (res) => {
    try {
        const { campaign } = res;
        const { _id, is_activated, filter, h_number, media, mediaName } =
            campaign;
        const isActivatedText = is_activated ? "Enabled" : "Disabled";

        $("#editModal").text("Edit Automation");

        // Input + textarea
        $("#addAutomation")
            .find(".form-control")
            .each(function () {
                $("#" + $(this).attr("id")).val(campaign[$(this).attr("name")]);
            });

        // Select
        $("#is_activated").val(is_activated.toString()).trigger("change");
        $("#trigger").val(campaign.trigger.toString()).trigger("change");
        $("#periode").val(campaign.periode.toString()).trigger("change");
        $("#h_type").val(campaign.h_type.toString()).trigger("change");
        $("#dijalankan").val(campaign.dijalankan.toString()).trigger("change");

        // Show modal
        // Important! Must show modal first before adding below filter or else the css will break!
        $(".modal-create").modal("show");
        await sleep(500);

        // Filter
        if (filter) {
            let i = 0;

            // Sort filter
            let ordered = {};

            _(filter)
                .keys()
                .sort()
                .each(function (key) {
                    ordered[key] = filter[key];
                });

            const sortedFilter = ordered;

            await async.eachOfSeries(sortedFilter, async (v, k) => {
                i++;
                $("#add-more-filter").click();
                await sleep(200);
                $("#select-filter-" + i)
                    .val(k)
                    .change()
                    .trigger("select2:select");

                if (
                    _.includes(
                        [
                            "tanggal-check-in",
                            "tanggal-check-out",
                            "tanggal-pembelian",
                            "tanggal-transaksi",
                            "tanggal-ulang-tahun",
                        ],
                        k
                    )
                ) {
                    // Range datetime
                    const range = v.split(" to ");
                    flatpickr(`#filter-kanan-${i} input`, {
                        mode: "range",
                        defaultDate: range,
                        dateFormat: datePickerFormat,
                    });
                }

                await sleep(200);
            });
        }

        // Template pesan
        $(".template-pesan-preview").html("");
        $("textarea.description").trigger("propertychange");

        // Datetime
        flatpickr("#h_time", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            defaultDate: campaign.h_time,
        });

        // Media
        if (media) {
            let mediaUrl = await (await fetch(media)).blob();
            mediaUrl = URL.createObjectURL(mediaUrl);

            const mediaType = mediaName ? mediaName.split(".").pop() : "";
            const imgPlaceholder = getMediaPlaceholder(mediaType, mediaUrl);

            $("#media-base64").val(media);
            $(".media-pesan .preview").html(
                `<a href="${mediaUrl}" target="_blank"><img src="${imgPlaceholder}" class="img-fluid"></a>`
            );
        }

        // Media Name
        if (mediaName) {
            $("#mediaName").val(mediaName);
            $(".mediaName").text(mediaName);
        }

        Swal.close();
    } catch (e) {
        console.log(e);
    }
};

// Table customer di halaman detail
const tableCustomer = () => {
    $("#tableCustomer").DataTable({
        pageLength: 10,
        lengthChange: false,
        searching: false,
        info: false,
        pagingType: "simple_numbers",
        order: [[0, "asc"]],
    });
};

// Debug automation
const debug = () => {
    $(document).on("click", ".btn-debug", function (e) {
        e.stopPropagation();
        loader();

        const url = $(this).data("url");
        const token = $("#json-webtoken").val();

        $.ajax({
            url: url,
            headers: { Authorization: `Bearer ${token}` },
            success: (res) => {
                Swal.close();
            },
            error: function (errors) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errors.responseJSON.message,
                });
            },
        });
    });
};

// Init semua select2
const initSelect2 = () => {
    // Trigger
    $("#trigger").select2({
        data: opsiFilterKiri2(),
        minimumResultsForSearch: -1,
        placeholder: "- Pilih Trigger -",
    });

    // Periode
    $("#periode").select2({
        data: [
            { id: "days", text: "Hari" },
            { id: "weeks", text: "Minggu" },
            { id: "months", text: "Bulan" },
        ],
        minimumResultsForSearch: -1,
        placeholder: "- Pilih Periode -",
    });
};

// Init semua datetime
const initFlatpicker = () => {
    // h_time
    flatpickr("#h_time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        defaultDate: "12:00",
    });

    // End Date
    const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");
    const end_date = flatpickr("#end_date", { minDate: tomorrow });

    $("#clear-end-date").on("click", function () {
        end_date.clear();
    });
};

// Play or pause automation
const toggleRunningStatus = () => {
    $(document).on("click", ".btn-toggle-running", function (e) {
        e.stopPropagation();
        loader();

        const id = $(this).data("id");
        const current = $(this).data("current");
        const apiUrl = $("#api-url").val();

        $.ajax({
            method: "post",
            url: apiUrl + "/automation/toggle-running",
            data: JSON.stringify({ id, current }),
            success: (res) => {
                const { error, errorMsg, msg } = res;

                if (error) {
                    Swal.fire({
                        title: "Error",
                        icon: "error",
                        text: errorMsg,
                    });
                } else {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Data has been saved.',
                    }).then((result) => {
                        $("#datatable").DataTable().ajax.reload()
                    });
                }
            },
            error: function (errors) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errors.responseJSON.message,
                });
            },
        });
    });
};

// Di halaman detail, automation setiap pelanggan bs dipause manual
const togglePelangganAutomation = () => {
    $(document).on("click", ".btn-toggle-pelanggan", function () {
        loader();

        const self = $(this);
        const apiUrl = $("#api-url").val();
        const idPelanggan = self.data("pelanggan-id");
        const idAutomation = self.data("automation-id");
        const namaPelanggan = self.data("pelanggan-name");
        const current = self.data("current");

        $.ajax({
            method: "post",
            url: apiUrl + "/automation/toggle-pelanggan",
            data: JSON.stringify({
                idPelanggan,
                idAutomation,
                current,
                namaPelanggan,
            }),
            success: (res) => {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Data has been saved.',
                }).then((result) => {
                    location.reload();
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
    });
};

$(document).ready(function () {
    templatePesan();
    tableCustomer();

    toggleRunningStatus();
    togglePelangganAutomation();

    initSelect2();
    initFlatpicker();

    tambahFilter();
    hapusFilter();

    save();
    edit();
    debug();
});
