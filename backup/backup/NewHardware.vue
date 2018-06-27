<template>
  <form>
    <input type="hidden" name="_method" value="PUT">
    <input type="hidden" name="_token" value="KpvH8qxhz9A9DuORB48AcGTJgxatIwVafjaV9Sbt">
    <div id="company_id" class="form-group">
      <label for="company_id" class="col-md-3 control-label">Company</label>
      <div class="col-md-7">
        <select id="company_select" class="js-data-ajax select2-hidden-accessible" data-endpoint="companies" name="company_id" style="width: 100%" tabindex="-1" aria-hidden="true">
          <option value="">Select Company</option>
        </select><span class="select2 select2-container select2-container--default" dir="ltr" style="width: 100%;"><span class="selection needsclick"><span class="select2-selection select2-selection--single needsclick" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-company_select-container"><span id="select2-company_select-container" class="select2-selection__rendered needsclick" title="Select Company">Select Company</span><span class="select2-selection__arrow needsclick" role="presentation"><b role="presentation"/></span></span></span><span class="dropdown-wrapper needsclick" aria-hidden="true"/></span>
      </div>
    </div>
    <div class="form-group ">
      <label for="asset_tag" class="col-md-3 control-label">Asset Tag</label>
      <div class="col-md-7 col-sm-12 required">
        <input id="asset_tag" class="form-control" type="text" name="asset_tag" value="00001">
      </div>
    </div>
    <div id="model_id" class="form-group">
      <label for="model_id" class="col-md-3 control-label">Model</label>
      <div class="col-md-7 required">
        <select id="model_select_id" class="js-data-ajax select2-hidden-accessible" data-endpoint="models" name="model_id" style="width: 100%" tabindex="-1" aria-hidden="true">
          <option value="1" selected="selected">
            Tablet
          </option>
        </select><span class="select2 select2-container select2-container--default" dir="ltr" style="width: 100%;"><span class="selection needsclick"><span class="select2-selection select2-selection--single needsclick" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-model_select_id-container"><span id="select2-model_select_id-container" class="select2-selection__rendered needsclick" title="
                    Tablet
                ">
          Tablet
        </span><span class="select2-selection__arrow needsclick" role="presentation"><b role="presentation"/></span></span></span><span class="dropdown-wrapper needsclick" aria-hidden="true"/></span>
      </div>
      <div class="col-md-1 col-sm-1 text-left">
        <a href="http://52.39.121.124:8080/modals/model" data-toggle="modal" data-target="#createModal" data-select="model_select_id" class="btn btn-sm btn-default">New</a>
        <span class="mac_spinner" style="padding-left: 10px; color: green; display:none; width: 30px;"><i class="fa fa-spinner fa-spin"/> </span>
      </div>
    </div>
    <div id="custom_fields_content">
      <div class="form-group">
        <label for="_snipeit_tid_2" class="col-md-3 control-label">tid </label>
        <div class="col-md-7 col-sm-12">
          <select class="format select2 form-control select2-hidden-accessible" name="_snipeit_tid_2" tabindex="-1" aria-hidden="true"><option value="">Select any</option><option value="01" selected="selected">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option></select><span class="select2 select2-container select2-container--default" dir="ltr" style="width: 679.703px;"><span class="selection needsclick"><span class="select2-selection select2-selection--single needsclick" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-_snipeit_tid_2-8d-container"><span id="select2-_snipeit_tid_2-8d-container" class="select2-selection__rendered needsclick" title="01">01</span><span class="select2-selection__arrow needsclick" role="presentation"><b role="presentation"/></span></span></span><span class="dropdown-wrapper needsclick" aria-hidden="true"/></span>
        </div>
      </div>
    </div>
    <div class="form-group ">
      <label for="status_id" class="col-md-3 control-label">Status</label>
      <div class="col-md-7 col-sm-11 required">
        <select id="status_select_id" class="select2 status_id select2-hidden-accessible" style="width:100%" name="status_id" tabindex="-1" aria-hidden="true"><option value="">Select Status</option><option value="3">Archived</option><option value="1">Pending</option><option value="2" selected="selected">Ready to Deploy</option></select><span class="select2 select2-container select2-container--default" dir="ltr" style="width: 100%;"><span class="selection needsclick"><span class="select2-selection select2-selection--single needsclick" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-status_select_id-container"><span id="select2-status_select_id-container" class="select2-selection__rendered needsclick" title="Ready to Deploy">Ready to Deploy</span><span class="select2-selection__arrow needsclick" role="presentation"><b role="presentation"/></span></span></span><span class="dropdown-wrapper needsclick" aria-hidden="true"/></span>
      </div>
      <div class="col-md-2 col-sm-2 text-left">
        <a href="http://52.39.121.124:8080/modals/statuslabel" data-toggle="modal" data-target="#createModal" data-select="status_select_id" class="btn btn-sm btn-default">New</a>
        <span class="status_spinner" style="padding-left: 10px; color: green; display: none; width: 30px;"><i class="fa fa-spinner fa-spin"/> </span>
      </div>

      <div id="status_helptext" class="col-md-7 col-sm-11 col-md-offset-3">
        <p id="selected_status_status" style="" class="text-success"><i class="fa fa-check"/> That status is deployable. This asset can be checked out.</p>
      </div>
    </div>
    <div class="form-group ">
      <label for="serial" class="col-md-3 control-label">Serial </label>
      <div class="col-md-7 col-sm-12">
        <input id="serial" class="form-control" type="text" name="serial" value="">
      </div>
    </div>
    <div class="form-group ">
      <label for="name" class="col-md-3 control-label">Asset Name</label>
      <div class="col-md-7 col-sm-12">
        <input id="name" class="form-control" type="text" name="name" value="">
      </div>
    </div>
    <div class="form-group ">
      <label for="purchase_date" class="col-md-3 control-label">Purchase Date</label>
      <div class="input-group col-md-3">
        <div class="input-group date" data-provide="datepicker" data-date-format="yyyy-mm-dd" data-autoclose="true">
          <input id="purchase_date" type="text" class="form-control" placeholder="Select Date (YYYY-MM-DD)" name="purchase_date" value="">
          <span class="input-group-addon"><i class="fa fa-calendar"/></span>
        </div>
      </div>
    </div>
    <div id="assigned_user" class="form-group">
      <label for="supplier_id" class="col-md-3 control-label">Supplier</label>
      <div class="col-md-7">
        <select id="supplier_select" class="js-data-ajax select2-hidden-accessible" data-endpoint="suppliers" name="supplier_id" style="width: 100%" tabindex="-1" aria-hidden="true">
          <option value="1" selected="selected">
            Asus
          </option>
        </select><span class="select2 select2-container select2-container--default" dir="ltr" style="width: 100%;"><span class="selection needsclick"><span class="select2-selection select2-selection--single needsclick" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-supplier_select-container"><span id="select2-supplier_select-container" class="select2-selection__rendered needsclick" title="
                    Asus
                ">
          Asus
        </span><span class="select2-selection__arrow needsclick" role="presentation"><b role="presentation"/></span></span></span><span class="dropdown-wrapper needsclick" aria-hidden="true"/></span>
      </div>

      <div class="col-md-1 col-sm-1 text-left">
        <a href="http://52.39.121.124:8080/modals/supplier" data-toggle="modal" data-target="#createModal" data-select="supplier_select" class="btn btn-sm btn-default">New</a>
      </div>
    </div>
    <div class="form-group ">
      <label for="order_number" class="col-md-3 control-label">Order Number</label>
      <div class="col-md-7 col-sm-12">
        <input id="order_number" class="form-control" type="text" name="order_number" value="">
      </div>
    </div>
    <div class="form-group ">
      <label for="purchase_cost" class="col-md-3 control-label">Purchase Cost</label>
      <div class="col-md-9">
        <div class="input-group col-md-3" style="padding-left: 0px;">
          <input id="purchase_cost" class="form-control" type="text" name="purchase_cost" value="">
          <span class="input-group-addon"/>
        </div>
        <div class="col-md-9" style="padding-left: 0px;"/>
      </div>
    </div>
    <div class="form-group ">
      <label for="warranty_months" class="col-md-3 control-label">Warranty</label>
      <div class="col-md-9">
        <div class="input-group col-md-3" style="padding-left: 0px;">
          <input id="warranty_months" class="form-control" type="text" name="warranty_months" value="0">
          <span class="input-group-addon">months</span>
        </div>
        <div class="col-md-9" style="padding-left: 0px;"/>
      </div>
    </div>
    <div class="form-group ">
      <label for="notes" class="col-md-3 control-label">Notes</label>
      <div class="col-md-7 col-sm-12">
        <textarea id="notes" class="col-md-6 form-control" name="notes"/>
      </div>
    </div>
    <div id="rtd_location_id" class="form-group">
      <label for="rtd_location_id" class="col-md-3 control-label">Default Location</label>
      <div class="col-md-7">
        <select id="rtd_location_id_location_select" class="js-data-ajax select2-hidden-accessible" data-endpoint="locations" name="rtd_location_id" style="width: 100%" tabindex="-1" aria-hidden="true">
          <option value="1" selected="selected">
            Flooring Store
          </option>
        </select><span class="select2 select2-container select2-container--default" dir="ltr" style="width: 100%;"><span class="selection needsclick"><span class="select2-selection select2-selection--single needsclick" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-rtd_location_id_location_select-container"><span id="select2-rtd_location_id_location_select-container" class="select2-selection__rendered needsclick" title="
                    Flooring Store
                ">
          Flooring Store
        </span><span class="select2-selection__arrow needsclick" role="presentation"><b role="presentation"/></span></span></span><span class="dropdown-wrapper needsclick" aria-hidden="true"/></span>
      </div>

      <div class="col-md-1 col-sm-1 text-left">
        <a href="http://52.39.121.124:8080/modals/location" data-toggle="modal" data-target="#createModal" data-select="rtd_location_id_location_select" class="btn btn-sm btn-default">New</a>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-3 col-sm-10">
        <label>
          <div class="icheckbox_minimal-blue" style="position: relative;"><input id="requestable" type="checkbox" value="1" name="requestable" class="minimal" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"/></div> Requestable
        </label>
      </div>
    </div>
    <div class="form-group ">
      <label class="col-md-3 control-label" for="image_delete">Delete Image</label>
      <div class="col-md-5">
        <label class="control-label" for="image_delete">
          <div class="icheckbox_minimal-blue" style="position: relative;"><input id="image_delete" type="checkbox" value="1" name="image_delete" class="minimal" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"/></div>

        </label>
        <div style="margin-top: 0.5em">
          <img src="http://52.39.121.124:8080/uploads/assets/G9Y53cf2nngJnDBieY42Mqok4.png" class="img-responsive">
        </div>
      </div>
    </div>
    <div class="form-group ">
      <label class="col-md-3 control-label" for="image">Upload Image</label>
      <div class="col-md-5">
        <label class="btn btn-default">
          Select File...
          <input id="uploadFile" type="file" name="image" data-maxsize="2097152" accept="image/gif,image/jpeg,image/png,image/svg" style="display:none">
        </label>
        <span id="upload-file-info" class="label label-default"/>

        <p id="upload-file-status" class="help-block">Accepted filetypes are jpg, png, gif, and svg. Max upload size allowed is 8M.</p>
      </div>
      <div class="col-md-4">
        <img id="imagePreview" style="max-width: 200px;">
      </div>
    </div>
    <div class="box-footer text-right">
      <a class="btn btn-link text-left" href="http://52.39.121.124:8080/hardware/1">Cancel</a>
      <button type="submit" class="btn btn-success"><i class="fa fa-check icon-white"/> Save</button>
    </div>
  </form>
</template>
<script>
  export default {
    $_veeValidate: {
      validator: 'new'
    },

    data: () => ({
      name: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      checkbox: null,
      dictionary: {
        attributes: {
          email: 'E-mail Address'
          // custom attributes
        },
        custom: {
          name: {
            required: () => 'Name can not be empty',
            max: 'The name field may not be greater than 10 characters'
            // custom messages
          },
          select: {
            required: 'Select field is required'
          }
        }
      }
    }),

    mounted () {
      this.$validator.localize('en', this.dictionary)
    },

    methods: {
      submit () {
        this.$validator.validateAll()
      },
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$validator.reset()
      }
    }
  }
</script>

