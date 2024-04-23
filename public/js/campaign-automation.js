$(document).ready(function() {
    resetForm()
    mediaHandler()
    loadMedia()
})

// Setiap kalo modal ditutup atau dibuka, kita reset form
const resetForm = () => {
    $('#addAutomationModal, #addCampaignModal').on('hide.bs.modal', function (e) {
        $('form#addAutomation, form#addCampaign').trigger("reset")
        $('.filter-container, .media-pesan .preview, .mediaName').html('')
        $('#add-more-filter').attr('data-id', '0')
        $('#media, #media-base64, #mediaName').val('')
    })
}

const getMediaPlaceholder = (ext, mediaUrl) => {
    let imgPlaceholder = ''

    if(_.includes(['png', 'jpg', 'jpeg'], ext)) imgPlaceholder = mediaUrl
    else if(_.includes(['pdf'], ext)) imgPlaceholder = '/imgs/pdf.png'
    else if(_.includes(['txt'], ext)) imgPlaceholder = '/imgs/txt.png'
    else if(_.includes(['doc', 'docx'], ext)) imgPlaceholder = '/imgs/doc.png'
    else if(_.includes(['xls', 'xlsx'], ext)) imgPlaceholder = '/imgs/xls.png'

    return imgPlaceholder
}

const mediaHandler = async() => {
    try{
        // Gambar kalo diubah, preview nya jg berubah
        $('#media').on('change', async function() {
            $('.media-pesan .preview').html('')

            let media = $(this).get(0).files[0]
            
            // Max 2MB
            if(media.size > 2097152) {
                Swal.fire({ title: 'Error', text: 'Ukuran maksimum 2MB!', icon: 'error' })
                this.value = ''
                return
            }

            let mediaUrl = URL.createObjectURL(media)
            let ext = media.name.split('.').pop()
            let imgPlaceholder = getMediaPlaceholder(ext, mediaUrl)

            $('.media-pesan .preview').html(`<a href="${mediaUrl}" target="_blank"><img src="${imgPlaceholder}" class="img-fluid"></a>`)
            $('.mediaName').text(media.name)
            $('#mediaName').val(media.name)
        })

        // Hapus gambar
        $('.btn-remove-media').on('click', function() {
            $('.media-pesan .preview, .mediaName').html('')
            $('#media, #media-base64, #mediaName').val('')
        })
    }
    catch(e) { console.log(e) }
}

const loadMedia = async() => {
    try{
        if(!$('.row-gambar').length) return

        let media = $('.row-gambar textarea.gambar').val()
        let mediaUrl = await(await fetch(media)).blob()
        mediaUrl = URL.createObjectURL(mediaUrl)

        const mediaName = $('#mediaName').val()
        const mediaType = mediaName ? mediaName.split('.').pop() : ''
        const imgPlaceholder = getMediaPlaceholder(mediaType, mediaUrl)

        $('.row-gambar .preview').html(`<a href="${mediaUrl}" target="_blank"><img src="${imgPlaceholder}" class="img-fluid"></a>`)
        $('.mediaName').text(mediaName)
    }
    catch(e) { console.log(e) }
}