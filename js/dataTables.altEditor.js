/*! Datatables altEditor 1.0
*/

/**
 * @summary     altEditor
 * @description Lightweight editor for DataTables
 * @version     1.0
 * @file        dataTables.editor.lite.js
 * @author      kingkode (www.kingkode.com)
 * @contact     www.kingkode.com/contact
 * @copyright   Copyright 2016 Kingkode
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.kingkode.com
 */

 /* Reworked edition
 This is a modified version of the altEditor 1.0

 New functionality:
  - Input validation.
  - Server communication with AJAX calls.

 Reworked:
  - Modal windows.
  - table rendering.
  - Add/Edit/Delete functions.
*/

var ajaxUrl;
var count;
var checkStudentUrl;
var checkSectionUrl;
var checkUrl;
var success_message;
var fail_message;

(function( factory ){
  if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( ['jquery', 'datatables.net'], function ( $ ) {
          return factory( $, window, document );
        } );
      }
      else if ( typeof exports === 'object' ) {
        // CommonJS
        module.exports = function (root, $) {
          if ( ! root ) {
            root = window;
          }

          if ( ! $ || ! $.fn.dataTable ) {
            $ = require('datatables.net')(root, $).$;
          }

          return factory( $, root, root.document );
        };
      }
      else {
        // Browser
        factory( jQuery, window, document );
      }
    }(function( $, window, document, undefined ) {
     'use strict';
     var DataTable = $.fn.dataTable;


     var _instance = 0;

   /** 
    * altEditor provides modal editing of records for Datatables
    *
    * @class altEditor
    * @constructor
    * @param {object} oTD DataTables settings object
    * @param {object} oConfig Configuration object for altEditor
    */
    var altEditor = function( dt, opts )
    {
     if ( ! DataTable.versionCheck || ! DataTable.versionCheck( '1.10.8' ) ) {
       throw( "Warning: altEditor requires DataTables 1.10.8 or greater");
     }

       // User and defaults configuration object
       this.c = $.extend( true, {},
         DataTable.defaults.altEditor,
         altEditor.defaults,
         opts
         );

       /**
        * @namespace Settings object which contains customisable information for altEditor instance
        */
        this.s = {
         /** @type {DataTable.Api} DataTables' API instance */
         dt: new DataTable.Api( dt ),

         /** @type {String} Unique namespace for events attached to the document */
         namespace: '.altEditor'+(_instance++)
       };


       /**
        * @namespace Common and useful DOM elements for the class instance
        */
        this.dom = {
         /** @type {jQuery} altEditor handle */
         modal: $('<div class="dt-altEditor-handle"/>'),
       };


       /* Constructor logic */
       this._constructor();
     }



     $.extend( altEditor.prototype, {
       /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        * Constructor
        * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

       /**
        * Initialise the RowReorder instance
        *
        * @private
        */
        _constructor: function ()
        {
           // console.log('altEditor Enabled')
           var that = this;
           var dt = this.s.dt;
           
           this._setup();

           dt.on( 'destroy.altEditor', function () {
             dt.off( '.altEditor' );
             $(dt.table().body()).off( that.s.namespace );
             $(document.body).off( that.s.namespace );
           } );
         },

       /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        * Private methods
        * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

       /**
        * Setup dom and bind button actions
        *
        * @private
        */
        _setup: function()
        {
         // console.log('Setup');

         var that = this;
         var dt = this.s.dt;

         // add modal
         $('body').append('\
          <div class="modal fade" id="altEditor-modal" tabindex="-1" role="dialog">\
          <div class="modal-dialog">\
          <div class="modal-content">\
          <div class="modal-header">\
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
          <h4 class="modal-title"></h4>\
          </div>\
          <div class="modal-body">\
          <p></p>\
          </div>\
          <div class="modal-footer">\
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
          <input type="submit" form="altEditor-form" class="btn btn-primary"></input>\
          </div>\
          </div>\
          </div>\
          </div>'
          );


         // add Edit Button
         if( this.s.dt.button('edit:name') )
         {
          this.s.dt.button('edit:name').action( function(e, dt, node, config) {

            var rows = dt.rows({
              selected: true
            }).count();

            if (dt.context[0].ajax.url) 
            {
              ajaxUrl = dt.context[0].ajax.url;
            }
            else
            {
              ajaxUrl = dt.context[0].ajax;
            }
            count = 0;

            that._openEditModal();
          });

          $(document).on('click', '#editRowBtn', function(e)
          {
            if(initValidation()){
              e.preventDefault();
              e.stopPropagation();
              that._editRowData();            
            }
          }); 

        }

        // add Edit Button
         if( this.s.dt.button('feedback:name') )
         {
          this.s.dt.button('feedback:name').action( function(e, dt, node, config) {

            var rows = dt.rows({
              selected: true
            }).count();



            if (dt.context[0].ajax.url) 
            {
              ajaxUrl = dt.context[0].ajax.url;
            }
            else
            {
              ajaxUrl = dt.context[0].ajax;
            }
            count = 0;

            that._feedbackModal();
          });

          $(document).on('click', '#feedbackBtn', function(e)
          {
            if(initValidation()){
              e.preventDefault();
              e.stopPropagation();
              that._feedbackData();            
            }
          }); 

        }

        // add Edit Button
         if( this.s.dt.button('sendVideo:name') )
         {
          this.s.dt.button('sendVideo:name').action( function(e, dt, node, config) {

            var rows = dt.rows({
              selected: true
            }).count();

            // alert(rows);



            if (dt.context[0].ajax.url) 
            {
              ajaxUrl = dt.context[0].ajax.url;
            }
            else
            {
              ajaxUrl = dt.context[0].ajax;
            }
            count = 0;

            that._sendVideoModal();
          });

          $(document).on('click', '#videoBtn', function(e)
          {
            if(initValidation()){
              e.preventDefault();
              e.stopPropagation();
              that._videoData();            
            }
          }); 

        }
        
        
        // add view data Button
         if( this.s.dt.button('view:name') )
         {
          this.s.dt.button('view:name').action( function(e, dt, node, config) {
            var rows = dt.rows({
              selected: true
            }).count();

            if (dt.context[0].ajax.url) 
            {
              ajaxUrl = dt.context[0].ajax.url;
            }
            else
            {
              ajaxUrl = dt.context[0].ajax;
            }
            count = 0;

            that._openViewModal();
          });

          $(document).on('click', '#viewRowBtn', function(e)
          {
            e.preventDefault();
            e.stopPropagation();
            that._viewRow();
            $(this).prop('disabled', true);
          });
        }

        // add viewVideo data Button
         if( this.s.dt.button('viewVideo:name') )
         {
          this.s.dt.button('viewVideo:name').action( function(e, dt, node, config) {
            var rows = dt.rows({
              selected: true
            }).count();

            if (dt.context[0].ajax.url) 
            {
              ajaxUrl = dt.context[0].ajax.url;
            }
            else
            {
              ajaxUrl = dt.context[0].ajax;
            }
            count = 0;

            that._openViewVideoModal();
          });

          $(document).on('click', '#viewRowBtn', function(e)
          {
            e.preventDefault();
            e.stopPropagation();
            that._viewVideoRow();
            $(this).prop('disabled', true);
          });
        }

         // add Delete Button
         if( this.s.dt.button('delete:name') )
         {
          this.s.dt.button('delete:name').action( function(e, dt, node, config) {
            var rows = dt.rows({
              selected: true
            }).count();

            if (dt.context[0].ajax.url) 
            {
              ajaxUrl = dt.context[0].ajax.url;
            }
            else
            {
              ajaxUrl = dt.context[0].ajax;
            }
            count = 0;

            that._openDeleteModal();
          });

          $(document).on('click', '#deleteRowBtn', function(e)
          {
            e.preventDefault();
            e.stopPropagation();
            that._deleteRow();
            $(this).prop('disabled', true);
          });
        }

         // add Add Button
         if( this.s.dt.button('add:name') )
         {
          this.s.dt.button('add:name').action( function(e, dt, node, config) {
            var rows = dt.rows({
              selected: true
            }).count();

            if (dt.context[0].ajax.url) 
            {
              ajaxUrl = dt.context[0].ajax.url;
            }
            else
            {
              ajaxUrl = dt.context[0].ajax;
            }

            count = 0;

            that._openAddModal();
          });

          $(document).on('click', '#addRowBtn', function(e)
          {
            if(initValidation()){
              e.preventDefault();
              e.stopPropagation();
              that._addRowData();               
            }
          });
        }

         // add Refresh button
         if( this.s.dt.button('refresh:name') )
         {
          this.s.dt.button('refresh:name').action( function(e, dt, node, config) {
            $.post('php/dhcp.php', {'act': 'get'})
              .done(function(res) {
                dt.ajax.reload();
                console.log("Datatable reloaded.")
               });
          });
        }
      },

       /**
        * Emit an event on the DataTable for listeners
        *
        * @param  {string} name Event name
        * @param  {array} args Event arguments
        * @private
        */
        _emitEvent: function ( name, args )
        {
         this.s.dt.iterator( 'table', function ( ctx, i ) {
           $(ctx.nTable).triggerHandler( name+'.dt', args );
         } );
       },


       /**
        * Open feedback Modal for selected row
        *
        * @private
        */
        _feedbackModal: function ()
        {
         var that = this;
         var dt = this.s.dt;
         var columnDefs = [];

         //Adding attribute IDs and values to object
         for( var i = 0; i < dt.context[0].aoColumns.length; i++ )
         {
          columnDefs.push({ title: dt.context[0].aoColumns[i].sTitle,
            name: dt.context[0].aoColumns[i].data
          });
        }
        var adata = dt.rows({
          selected: true
        });

        //Building feedback-modal
        var data = "";

        data += "<form id='altEditor-form-feedback' name='altEditor-form' role='form'>";

        for(var j = 0; j < columnDefs.length; j++){

          if (columnDefs[j].name.includes("student_id")) 
          {
            data += "<input  type='hidden'  id='" + columnDefs[j].title + "' name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' style='overflow:hidden'  class='form-control form-control-sm' value='" + adata.data()[0][columnDefs[j].name] + "' >";
          }

        }

        if (dt.context[0].ajax.url == 'feedbackDAO.php')
        {
            data += subject_array;
        }


        else if (dt.context[0].ajax.url === 'academiaDAO.php') 
        {
          //grasping ability  
          data += "<div class='form-group'>"

          data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";
              
          data += "<label for=''>Grasping Ability:</label></div>";

          data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

          data += "<textarea  id='grasping_ability'  pattern=''  title='' title  name='grasping_ability' placeholder='Your words here' data-special='' data-errorMsg='' style='overflow:hidden'  class='form-control  form-control-sm' ></textarea>";
          data += "<label style=' color: red;' id='messagelabel" + "' hidden class='errorLabel'></label>";
        
          data +="</div><div style='clear:both;'></div></div>";
        
          //Reading skills  
          data += "<div class='form-group'>"

          data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";
              
          data += "<label for=''>Reading Skills:</label></div>";

          data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

          data += "<textarea  id='reading_skills'  pattern=''  title='' title  name='reading_skills' placeholder='Your words here' data-special='' data-errorMsg='' style='overflow:hidden'  class='form-control  form-control-sm' ></textarea>";
          data += "<label style=' color: red;' id='messagelabel" + "' hidden class='errorLabel'></label>";
        
          data +="</div><div style='clear:both;'></div></div>";
          
          //writing skills  
          data += "<div class='form-group'>"

          data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";
              
          data += "<label for=''>Writing Skills:</label></div>";

          data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

          data += "<textarea  id='writing_skills'  pattern=''  title='' title  name='writing_skills' placeholder='Your words here' data-special='' data-errorMsg='' style='overflow:hidden'  class='form-control  form-control-sm' ></textarea>";
          data += "<label style=' color: red;' id='messagelabel" + "' hidden class='errorLabel'></label>";
        
          data +="</div><div style='clear:both;'></div></div>";
          
          //personality development  
          data += "<div class='form-group'>"

          data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";
              
          data += "<label for=''>Personality Development:</label></div>";

          data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

          data += "<textarea  id='personality_development'  pattern=''  title='' title  name='personality_development' placeholder='Your words here' data-special='' data-errorMsg='' style='overflow:hidden'  class='form-control  form-control-sm' ></textarea>";
          data += "<label style=' color: red;' id='messagelabel" + "' hidden class='errorLabel'></label>";
        
          data +="</div><div style='clear:both;'></div></div>";
        
        }


        else if (dt.context[0].ajax.url == 'studentDAO.php') 
        {
          
          data += "<div class='form-group'>"

          data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";
              
          data += "<label for=''>Roll No:</label></div>";

          data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

          data += "<input type='text' readonly id='" + columnDefs[1].name + "' value='" + adata.data()[0][columnDefs[1].name] + "' name='" + columnDefs[1].name + "' style='overflow:hidden'  class='form-control form-control-sm'>";
        
          data +="</div><div style='clear:both;'></div></div>";



          data += "<div class='form-group'>"

          data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";
              
          data += "<label for=''>Name:</label></div>";

          data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

          data += "<input type='text' readonly id='" + columnDefs[4].name + "' value='" + adata.data()[0][columnDefs[4].name] + "' name='" + columnDefs[3].name + "' style='overflow:hidden'  class='form-control form-control-sm'>";
        
          data +="</div><div style='clear:both;'></div></div>";          


        }
        
        
         if (dt.context[0].ajax.url !== 'feedbackDAO.php' && dt.context[0].ajax.url !== 'academiaDAO.php')
         {
                data += "<div class='form-group'>";

                data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";

                data += "<label for=''>Message:</label></div>";

                data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

                data += "<textarea  id='message'  pattern=''  title='' title  name='message' placeholder='Your words here' data-special='' data-errorMsg='' style='overflow:hidden'  class='form-control  form-control-sm' ></textarea>";
                data += "<label style=' color: red;' id='messagelabel" + "' hidden class='errorLabel'></label>";

                data +="</div><div style='clear:both;'></div></div>";

        }

        data += "</form>";

        $('#altEditor-modal').on('show.bs.modal', function() {
          if (dt.context[0].ajax.url === 'feedbackDAO.php')
          {
            $('#altEditor-modal').find('.modal-title').html('Send feedback');
          }
          else if (dt.context[0].ajax.url === 'academiaDAO.php') 
          {
            $('#altEditor-modal').find('.modal-title').html('Send Message');
          }
          else if (dt.context[0].ajax.url === 'studentDAO.php')
          {
            $('#altEditor-modal').find('.modal-title').html('Send Fee Status');
          }
          
          
          $('#altEditor-modal').find('.modal-body').html(data);
          $('#altEditor-modal').find('.modal-footer').html("<button type='button' data-content='remove' class='btn btn-default' data-dismiss='modal'>Close</button>\
           <button type='button' data-content='remove' class='btn btn-primary' id='feedbackBtn'>Send</button>");
        });

        $('#altEditor-modal').modal('show');
        $('#altEditor-modal input[0]').focus();

      },

      _feedbackData: function( )
      {
          var that = this;

          var form = $('form#altEditor-form-feedback')[0];
          var formData = new FormData(form);
          formData.append('action','send');

          //Calling AJAX with data, tableObject, command.
          updateJSON(formData, that, "feedback");

    },

    /**
        * Open send Modal for selected row
        *
        * @private
        */
        _sendVideoModal: function ()
        {
         var that = this;
         var dt = this.s.dt;
         var columnDefs = [];

         //Adding attribute IDs and values to object
         for( var i = 0; i < dt.context[0].aoColumns.length; i++ )
         {
          columnDefs.push({ title: dt.context[0].aoColumns[i].sTitle,
            name: dt.context[0].aoColumns[i].data
          });
        }

        // alert(dt.context[0].aoColumns.length);
        var adata = dt.rows({
          selected: true
        });

        //Building feedback-modal
        var data = "";



        data += "<form id='altEditor-form-video' name='altEditor-form' role='form'>";
        var student_id = '';
        for (var i = 0; i < adata.data().length; i++) {
            if (i == 0) {
              student_id = student_id + adata.data()[i][columnDefs[0].name];
              
            }
            else {
              student_id = student_id+","+ adata.data()[i][columnDefs[0].name];
              
            }
        }

        for(var j = 0; j < columnDefs.length; j++){

          if (columnDefs[j].name.includes("student_id")) 
          {
            data += "<input  type='hidden'  id='" + columnDefs[j].title + "' name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' style='overflow:hidden'  class='form-control form-control-sm' value='" + student_id + "' >";
          }

        }

        if (dt.context[0].ajax.url == 'feedbackDAO.php')
        {
            data += subject_array;
        }


        else if (dt.context[0].ajax.url === 'academiaDAO.php') 
        {
          //grasping ability  
          data += "<div class='form-group'>"

          data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";
              
          data += "<label for=''>Grasping Ability:</label></div>";

          data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

          data += "<textarea  id='grasping_ability'  pattern=''  title='' title  name='grasping_ability' placeholder='Your words here' data-special='' data-errorMsg='' style='overflow:hidden'  class='form-control  form-control-sm' ></textarea>";
          data += "<label style=' color: red;' id='messagelabel" + "' hidden class='errorLabel'></label>";
        
          data +="</div><div style='clear:both;'></div></div>";
        
          //Reading skills  
          data += "<div class='form-group'>"

          data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";
              
          data += "<label for=''>Reading Skills:</label></div>";

          data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

          data += "<textarea  id='reading_skills'  pattern=''  title='' title  name='reading_skills' placeholder='Your words here' data-special='' data-errorMsg='' style='overflow:hidden'  class='form-control  form-control-sm' ></textarea>";
          data += "<label style=' color: red;' id='messagelabel" + "' hidden class='errorLabel'></label>";
        
          data +="</div><div style='clear:both;'></div></div>";
          
          //writing skills  
          data += "<div class='form-group'>"

          data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";
              
          data += "<label for=''>Writing Skills:</label></div>";

          data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

          data += "<textarea  id='writing_skills'  pattern=''  title='' title  name='writing_skills' placeholder='Your words here' data-special='' data-errorMsg='' style='overflow:hidden'  class='form-control  form-control-sm' ></textarea>";
          data += "<label style=' color: red;' id='messagelabel" + "' hidden class='errorLabel'></label>";
        
          data +="</div><div style='clear:both;'></div></div>";
          
          //personality development  
          data += "<div class='form-group'>"

          data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";
              
          data += "<label for=''>Personality Development:</label></div>";

          data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

          data += "<textarea  id='personality_development'  pattern=''  title='' title  name='personality_development' placeholder='Your words here' data-special='' data-errorMsg='' style='overflow:hidden'  class='form-control  form-control-sm' ></textarea>";
          data += "<label style=' color: red;' id='messagelabel" + "' hidden class='errorLabel'></label>";
        
          data +="</div><div style='clear:both;'></div></div>";
        
        }


        else if (dt.context[0].ajax.url == 'studentDAO.php') 
        {
          var ids = '';
          var names = '';
          for (var i = 0; i < adata.data().length; i++) {
              if (i == 0) {
                ids = ids + adata.data()[i][columnDefs[1].name];
                names = names + adata.data()[i][columnDefs[5].name]
              }
              else {
                ids = ids+","+ adata.data()[i][columnDefs[1].name];
                names = names+","+ adata.data()[i][columnDefs[5].name]
              }
          }
          data += "<div class='form-group'>"

          data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";
              
          data += "<label for=''>Roll No:</label></div>";

          data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

          data += "<input type='text' readonly id='" + columnDefs[1].name + "' value='" + ids + "' name='" + columnDefs[1].name + "' style='overflow:hidden'  class='form-control form-control-sm'>";
        
          data +="</div><div style='clear:both;'></div></div>";



          data += "<div class='form-group'>"

          data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";
              
          data += "<label for=''>Name:</label></div>";

          data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

          data += "<input type='text' readonly id='" + columnDefs[4].name + "' value='" + names + "' name='" + columnDefs[4].name + "' style='overflow:hidden'  class='form-control form-control-sm'>";
        
          data +="</div><div style='clear:both;'></div></div>"; 


          data += "<div class='form-group'>"

          data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";
              
          data += "<label for=''>Title:</label></div>";

          data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

          data += "<input type='text' id='title' value='' name='title' style='overflow:hidden'  class='form-control form-control-sm'>";
          data += "<label style=' color: red;' id='messagelabel" + "' hidden class='errorLabel'></label>";
        
          data +="</div><div style='clear:both;'></div></div>";          


        }
        
        
         if (dt.context[0].ajax.url !== 'feedbackDAO.php' && dt.context[0].ajax.url !== 'academiaDAO.php')
         {
                data += "<div class='form-group'>";

                data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";

                data += "<label for=''>Url:</label></div>";

                data += "<div class='col-sm-6 col-md-6 col-lg-6'>";
                data += "<input type='url' id='url' value='' name='url' pattern='https?://.+' style='overflow:hidden' placeholder='http://www.example.com'  class='form-control form-control-sm' required>";

                data += "<label style=' color: red;' id='messagelabel" + "' hidden class='errorLabel'></label>";

                data +="</div><div style='clear:both;'></div></div>";

        }

        data += "</form>";

        $('#altEditor-modal').on('show.bs.modal', function() {
          if (dt.context[0].ajax.url === 'feedbackDAO.php')
          {
            $('#altEditor-modal').find('.modal-title').html('Send feedback');
          }
          else if (dt.context[0].ajax.url === 'academiaDAO.php') 
          {
            $('#altEditor-modal').find('.modal-title').html('Send Message');
          }
          else if (dt.context[0].ajax.url === 'studentDAO.php')
          {
            $('#altEditor-modal').find('.modal-title').html('Send Video');
          }
          
          
          $('#altEditor-modal').find('.modal-body').html(data);
          $('#altEditor-modal').find('.modal-footer').html("<button type='button' data-content='remove' class='btn btn-default' data-dismiss='modal'>Close</button>\
           <button type='button' data-content='remove' class='btn btn-primary' id='videoBtn'>Send</button>");
        });

        $('#altEditor-modal').modal('show');
        $('#altEditor-modal input[0]').focus();

      },

      _videoData: function( )
      {
          var that = this;

          var form = $('form#altEditor-form-video')[0];
          var formData = new FormData(form);
          formData.append('action','sendVideo');

          //Calling AJAX with data, tableObject, command.
          updateJSON(formData, that, "video");

    },




       /**
        * Open Edit Modal for selected row
        * 
        * @private
        */
        _openEditModal: function ( )
        {
         var that = this;
         var dt = this.s.dt;
         var columnDefs = [];

    //Adding column attributes to object.
    //Assuming that the first defined column is ID - Therefore skipping that
    //and starting at index 1, because we dont wanna be able to change the ID.
   for( var i = 0; i < dt.context[0].aoColumns.length; i++ )
   {
    columnDefs.push({ title: dt.context[0].aoColumns[i].sTitle,
      name: dt.context[0].aoColumns[i].data,
      type: dt.context[0].aoColumns[i].type,
      options: dt.context[0].aoColumns[i].options,
      depends: dt.context[0].aoColumns[i].depends,
      class: dt.context[0].aoColumns[i].class,
      msg: dt.context[0].aoColumns[i].errorMsg,
      hoverMsg: dt.context[0].aoColumns[i].hoverMsg,
      pattern: dt.context[0].aoColumns[i].pattern,
      special: dt.context[0].aoColumns[i].special
    });
  }
  var adata = dt.rows({
    selected: true
  });

          //Building edit-form
          var data = "";

          var setDatepicker = 0;

          data += '<form id="altEditor-form-edit" enctype="multipart/form-data" name="altEditor-form" role="form">';

          for(var j = 0; j < columnDefs.length; j++){

            if (!columnDefs[j].type.includes("readonly")) {

              data += "<div class='form-group'>"

              data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>";
              
              data += "<label for='" + columnDefs[j].name + "'>" + columnDefs[j].title + ":</label></div>";

              data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

              //Adding text-inputs and errorlabels
              if(columnDefs[j].type.includes("text")){

                if (columnDefs[j].special && columnDefs[j].special.includes("noEdit")) 
                {
                  data += "<input readonly type='" + columnDefs[j].type + "' id='" + columnDefs[j].name + "'  pattern='" + columnDefs[j].pattern + "'  title='" + columnDefs[j].hoverMsg + "' title  name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' data-special='" + columnDefs[j].special + "' data-errorMsg='" + columnDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' value='" + adata.data()[0][columnDefs[j].name] + "'>";
                  data += "<label style=' color: red;' id='" + columnDefs[j].name + "label" + "' hidden class='errorLabel'></label>";
                }
                else
                {
                  data += "<input type='" + columnDefs[j].type + "' id='" + columnDefs[j].name + "'  pattern='" + columnDefs[j].pattern + "'  title='" + columnDefs[j].hoverMsg + "' title  name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' data-special='" + columnDefs[j].special + "' data-errorMsg='" + columnDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' value='" + adata.data()[0][columnDefs[j].name] + "'>";
                  data += "<label style=' color: red;' id='" + columnDefs[j].name + "label" + "' hidden class='errorLabel'></label>";
                }
              }

              if(columnDefs[j].type.includes("noEdit")){

                data += "<input readonly type='text' id='" + columnDefs[j].name + "'  pattern='" + columnDefs[j].pattern + "'  title='" + columnDefs[j].hoverMsg + "' title  name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' data-special='" + columnDefs[j].special + "' data-errorMsg='" + columnDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' value='" + adata.data()[0][columnDefs[j].name] + "'>";
                data += "<label style=' color: red;' id='" + columnDefs[j].name + "label" + "' hidden class='errorLabel'></label>";
              }

              //Adding text-inputs and errorlabels
              if(columnDefs[j].type.includes("date")){

                setDatepicker = 1;
                data += "<input type='text' id='dob'  pattern='" + columnDefs[j].pattern + "'  title='" + columnDefs[j].hoverMsg + "' title  name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' data-special='" + columnDefs[j].special + "' data-errorMsg='" + columnDefs[j].msg + "' style='overflow:hidden; box-shadow: 0px 0px 0px #fff;'  class='form-control form-control-sm' value='" + adata.data()[0][columnDefs[j].name] + "'>";
                data += "<label style=' color: red;' id='" + columnDefs[j].name + "label" + "' hidden class='errorLabel'></label>";
              }

              //Adding text-area and errorlabels
              if(columnDefs[j].type.includes("txtarea")){
                data += "<textarea  id='" + columnDefs[j].name + "'  pattern='" + columnDefs[j].pattern + "'  title='" + columnDefs[j].hoverMsg + "' title  name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' data-special='" + columnDefs[j].special + "' data-errorMsg='" + columnDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' >" + adata.data()[0][columnDefs[j].name] + "</textarea>";
                data += "<label style=' color: red;' id='" + columnDefs[j].name + "label" + "' hidden class='errorLabel'></label>";
              }

              if(columnDefs[j].type.includes("button")){
                data += "<textarea  id='" + columnDefs[j].name + "'  pattern='" + columnDefs[j].pattern + "'  title='" + columnDefs[j].hoverMsg + "' title  name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' data-special='" + columnDefs[j].special + "' data-errorMsg='" + columnDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' >" + adata.data()[0][columnDefs[j].name] + "</textarea>";
                data += "<label style=' color: red;' id='" + columnDefs[j].name + "label" + "' hidden class='errorLabel'></label>";
              }

              //Adding select-fields
              if(columnDefs[j].type.includes("select")){

                if (columnDefs[j].special && columnDefs[j].special.includes("noEdit")) 
                {
                  data += "<input readonly type='" + columnDefs[j].type + "' id='" + columnDefs[j].name + "'  pattern='" + columnDefs[j].pattern + "'  title='" + columnDefs[j].hoverMsg + "' title  name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' data-special='" + columnDefs[j].special + "' data-errorMsg='" + columnDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' value='" + adata.data()[0][columnDefs[j].name] + "'>";
                  data += "<label style=' color: red;' id='" + columnDefs[j].name + "label" + "' hidden class='errorLabel'></label>";
                }
                else
                {

                 var options = "";
                 var func = "";

                 options += "<option value='" + adata.data()[0][columnDefs[j].name] + "' selected >" + adata.data()[0][columnDefs[j].name] + "</option>";

                  for (var i = 0; i < columnDefs[j].options.length; i++) {

                    //Assigning the selected value of the <selected> option
                    // if(adata.data()[0][columnDefs[j].name].includes(columnDefs[j].options[i].label)){
                    //   options += "<option value='" + columnDefs[j].options[i].value + "' selected >" + columnDefs[j].options[i].label + "</option>";
                    // }else{
                      options += "<option value='" + columnDefs[j].options[i].value + "'>" + columnDefs[j].options[i].label + "</option>";
                    // }
                  }

                  if(columnDefs[j].depends)
                  {
                    data += "<select id='" + columnDefs[j].name + "'  name='" + columnDefs[j].name + "' class='form-control' onChange='update()'>" + options + "</select>";
                  }
                  else
                  {
                    data += "<select id='" + columnDefs[j].name + "'  name='" + columnDefs[j].name + "' class='form-control'>" + options + "</select>";
                  }

                  data += "<label style=' color: red;' id='" + columnDefs[j].name + "label" + "' hidden class='errorLabel'></label>";
                }
              
              } 

               //Adding file-inputs and errorlabels
              if(columnDefs[j].type.includes("file")){
                data += "<input type='" + columnDefs[j].type + "' title id='" + columnDefs[j].name + "'  pattern='" + columnDefs[j].pattern + "'  title='" + columnDefs[j].hoverMsg + "' name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' data-special='" + columnDefs[j].special + "' data-errorMsg='" + columnDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' value='" + adata.data()[0][columnDefs[j].name] + "'>";
                data += "<label id='" + columnDefs[j].name + "label" + "' class=''>leave empty for no change!</label>";
              }

              data +="</div><div style='clear:both;'></div></div>";
            }
         
            //Adding readonly-fields
            if(columnDefs[j].type.includes("readonly")){
              data += "<input type='hidden'  id='" + columnDefs[j].title + "' name='" + columnDefs[j].name + "' title  placeholder='" + columnDefs[j].title + "' style='overflow:hidden'  class='form-control  form-control-sm' value='" + adata.data()[0][columnDefs[j].name] + "'>";
            }

          }

          data += "</form>";
            
// to edit records of added student

           $('#altEditor-modal').on('show.bs.modal', function() {
            $('#altEditor-modal').find('.modal-title').html('Edit Record');
            $('#altEditor-modal').find('.modal-body').html(data);
            $('#altEditor-modal').find('.modal-footer').html("<button type='button' data-content='remove' class='btn btn-default' data-dismiss='modal'>Close</button>\
             <button type='button' data-content='remove' class='btn btn-primary' id='editRowBtn'>Update</button>");

          });


          $('#altEditor-modal').modal('show');
          $('#altEditor-modal input[0]').focus();
          new update();
          if (setDatepicker == 1) 
          {
            $('#dob').daterangepicker({
              singleDatePicker: true,
              singleClasses: "picker_4"
            }, function(start, end, label) {
              console.log(start.toISOString(), end.toISOString(), label);
            });
          }
        },

        _editRowData: function()
        {
          	var that = this;

	        var form = $('form#altEditor-form-edit')[0];
	        var formData = new FormData(form);
	        formData.append('action','edit');

	        //Calling AJAX with data, tableObject, command.
	        updateJSON(formData, that, "editRow");   
        },
        
        
        /**
        * Open view Modal for selected row
        *
        * @private
        */
        _openViewModal: function ()
        {
            var that = this;
            var dt = this.s.dt;
            var columnDefs = [];

            //Adding attribute IDs and values to object
            for( var i = 0; i < dt.context[0].aoColumns.length; i++ )
            {
                columnDefs.push({ title: dt.context[0].aoColumns[i].sTitle,
                  name: dt.context[0].aoColumns[i].data
                });
            }
            
            var adata = dt.rows({
              selected: true
            });
            
            var student_id = adata.data()[0][columnDefs[0].name];
            
            if (dt.context[0].ajax.url === 'studentDAO.php') {
                getPreviousFeeStatus(student_id);
            } else if (dt.context[0].ajax.url === 'feedbackDAO.php'){
                getPreviousFeedback(student_id);
            } else if (dt.context[0].ajax.url === 'academiaDAO.php'){
                getPreviousAcademiaData(student_id);
            }
           

      },
      
      _viewRow: function( )
      {
       		var that = this;

	        var form = $('form#altEditor-form-view')[0];
	        var formData = new FormData(form);
	        formData.append('action','view');

	        //Calling AJAX with data, tableObject, command.
	        updateJSON(formData, that, "viewRow");

      },

       /**
        * Open Delete Modal for selected row
        *
        * @private
        */
        _openDeleteModal: function ()
        {
         var that = this;
         var dt = this.s.dt;
         var columnDefs = [];

         //Adding attribute IDs and values to object
         for( var i = 0; i < dt.context[0].aoColumns.length; i++ )
         {
          columnDefs.push({ title: dt.context[0].aoColumns[i].sTitle,
            name: dt.context[0].aoColumns[i].data
          });
        }
        var adata = dt.rows({
          selected: true
        });

        //Building delete-modal
        var data = "";

        data += "<form id='altEditor-form-delete' name='altEditor-form' role='form'>";
        for(var j = 0; j < columnDefs.length; j++){
          if( columnDefs[j].title !== 'Action' ){
              if (columnDefs[j].name != 'profile_picture') {

               data += "<div class='form-group'><label for='" + columnDefs[j].name + "'>" + columnDefs[j].title + " : </label><input  type='hidden'  id='" + columnDefs[j].title + "' name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' style='overflow:hidden'  class='form-control' value='" + 'adata.data()[0][columnDefs[j].name]' + "' >" + adata.data()[0][columnDefs[j].name] + "</input></div>";
              }          
            }
        }
        data += "</form>";

        $('#altEditor-modal').on('show.bs.modal', function() {
          $('#altEditor-modal').find('.modal-title').html('Delete Record');
          $('#altEditor-modal').find('.modal-body').html(data);
          $('#altEditor-modal').find('.modal-footer').html("<button type='button' data-content='remove' class='btn btn-default' data-dismiss='modal'>Close</button>\
           <button type='button'  data-content='remove' class='btn btn-danger' id='deleteRowBtn'>Delete</button>");
        });

        $('#altEditor-modal').modal('show');
        $('#altEditor-modal input[0]').focus();

      },

      _deleteRow: function( )
      {
       		var that = this;

	        var form = $('form#altEditor-form-delete')[0];
	        var formData = new FormData(form);
	        formData.append('action','delete');

	        //Calling AJAX with data, tableObject, command.
	        updateJSON(formData, that, "deleteRow");

 },

 /**
        * Open view Video Modal for selected row
        *
        * @private
        */
        _openViewVideoModal: function ()
        {
            var that = this;
            var dt = this.s.dt;
            var columnDefs = [];

            //Adding attribute IDs and values to object
            for( var i = 0; i < dt.context[0].aoColumns.length; i++ )
            {
                columnDefs.push({ title: dt.context[0].aoColumns[i].sTitle,
                  name: dt.context[0].aoColumns[i].data
                });
            }
            
            var adata = dt.rows({
              selected: true
            });
            
            var student_id = adata.data()[0][columnDefs[0].name];
            
            if (dt.context[0].ajax.url === 'studentDAO.php') {
                getPreviousVideoStatus(student_id);
            } else if (dt.context[0].ajax.url === 'feedbackDAO.php'){
                getPreviousFeedback(student_id);
            } else if (dt.context[0].ajax.url === 'academiaDAO.php'){
                getPreviousAcademiaData(student_id);
            }

           

      },
      
      _viewVideoRow: function( )
      {
          var that = this;

          var form = $('form#altEditor-form-viewVideo')[0];
          var formData = new FormData(form);
          formData.append('action','viewVideo');

          //Calling AJAX with data, tableObject, command.
          updateJSON(formData, that, "viewVideoRow");

      },

       /**
        * Open Delete Modal for selected row
        *
        * @private
        */
        _openDeleteModal: function ()
        {
         var that = this;
         var dt = this.s.dt;
         var columnDefs = [];

         //Adding attribute IDs and values to object
         for( var i = 0; i < dt.context[0].aoColumns.length; i++ )
         {
          columnDefs.push({ title: dt.context[0].aoColumns[i].sTitle,
            name: dt.context[0].aoColumns[i].data
          });
        }
        var adata = dt.rows({
          selected: true
        });

        //Building delete-modal
        var data = "";

        data += "<form id='altEditor-form-delete' name='altEditor-form' role='form'>";
        for(var j = 0; j < columnDefs.length; j++){
          if( columnDefs[j].title !== 'Action' ){
            if (columnDefs[j].name != 'profile_picture') {
               data += "<div class='form-group'><label for='" + columnDefs[j].name + "'>" + columnDefs[j].title + " : </label><input  type='hidden'  id='" + columnDefs[j].title + "' name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' style='overflow:hidden'  class='form-control' value='" + adata.data()[0][columnDefs[j].name] + "' >" + adata.data()[0][columnDefs[j].name] + "</input></div>";
            }
          }
        }
        data += "</form>";

        $('#altEditor-modal').on('show.bs.modal', function() {
          $('#altEditor-modal').find('.modal-title').html('Delete Record');
          $('#altEditor-modal').find('.modal-body').html(data);
          $('#altEditor-modal').find('.modal-footer').html("<button type='button' data-content='remove' class='btn btn-default' data-dismiss='modal'>Close</button>\
           <button type='button'  data-content='remove' class='btn btn-danger' id='deleteRowBtn'>Delete</button>");
        });

        $('#altEditor-modal').modal('show');
        $('#altEditor-modal input[0]').focus();

      },

      _deleteRow: function( )
      {
          var that = this;

          var form = $('form#altEditor-form-delete')[0];
          var formData = new FormData(form);
          formData.append('action','delete');

          //Calling AJAX with data, tableObject, command.
          updateJSON(formData, that, "deleteRow");

 },


       /**
        * Open Add Modal for selected row
        * 
        * @private
        */
        _openAddModal: function ( )
        {
         var that = this;
         var dt = this.s.dt;
         var columnDefs = [];

         //Adding column attributes to object.
         for( var i = 0; i < dt.context[0].aoColumns.length; i++ )
         {
          columnDefs.push({ title: dt.context[0].aoColumns[i].sTitle,
            name: dt.context[0].aoColumns[i].data,
            type: dt.context[0].aoColumns[i].type,
            options: dt.context[0].aoColumns[i].options,
            def: dt.context[0].aoColumns[i].def,
            depends: dt.context[0].aoColumns[i].depends,
            class: dt.context[0].aoColumns[i].class,
            msg: dt.context[0].aoColumns[i].errorMsg,
            hoverMsg: dt.context[0].aoColumns[i].hoverMsg,
            pattern: dt.context[0].aoColumns[i].pattern,
            special: dt.context[0].aoColumns[i].special
          }); 
        }

        //Building add-form
        var data = "";

        var setDatepicker = 0;

        data += "<form id='altEditor-form-add' enctype='multipart/form-data' name='altEditor-form' role='form'>";


        if (dt.context[0].ajax.url == 'sectionDAO.php') 
        {

          data += "<input type='hidden' id='class_name'  pattern=''  title='' title  name='class_name' placeholder='' data-special='' data-errorMsg='' style='overflow:hidden'  class='form-control  form-control-sm' value='"+dt.context[0].ajax.data.id+"'>";

        }

        for(var j = 0; j < columnDefs.length; j++){

            

            if (!columnDefs[j].type.includes("readonly")) {

              data += "<div class='form-group'>"

              data += "<div class='col-sm-5 col-md-5 col-lg-5 text-right' style='padding-top:4px;'>"
              
              data += "<label for='" + columnDefs[j].name + "'>" + columnDefs[j].title + ":</label></div>"

              data += "<div class='col-sm-6 col-md-6 col-lg-6'>";

                 //Adding text-inputs and errorlabels
                if(columnDefs[j].type.includes("text")){

                  data += "<input type='" + columnDefs[j].type + "' id='" + columnDefs[j].name + "'  pattern='" + columnDefs[j].pattern + "'  name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' data-special='" + columnDefs[j].special + "' data-errorMsg='" + columnDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' value=''>";
                  data += "<label style=' color: red;' id='" + columnDefs[j].name + "label" + "' hidden hidden class='errorLabel'></label>";
                }

                //Adding text-inputs and errorlabels
                if(columnDefs[j].type.includes("date")){

                  setDatepicker = 1;
                  data += "<input type='text' id='dob'  pattern='" + columnDefs[j].pattern + "'  title='" + columnDefs[j].hoverMsg + "' title  name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' data-special='" + columnDefs[j].special + "' data-errorMsg='" + columnDefs[j].msg + "' style='overflow:hidden; box-shadow: 0px 0px 0px #fff;'  class='form-control form-control-sm' value=''>";
                  data += "<label style=' color: red;' id='" + columnDefs[j].name + "label" + "' hidden class='errorLabel'></label>";
                }



                if(columnDefs[j].type.includes("noEdit")){

                data += "<input type='text' readonly id='" + columnDefs[j].name + "'  pattern='" + columnDefs[j].pattern + "'  title='" + columnDefs[j].hoverMsg + "' title  name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' data-special='" + columnDefs[j].special + "' data-errorMsg='" + columnDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' value='"+columnDefs[j].def+"'>";
                data += "<label style=' color: red;' id='" + columnDefs[j].name + "label" + "' hidden class='errorLabel'></label>";
                }

                //Adding text-area and errorlabels
                if(columnDefs[j].type.includes("txtarea")){
                  data += "<textarea  id='" + columnDefs[j].name + "'  pattern='" + columnDefs[j].pattern + "'  title='" + columnDefs[j].hoverMsg + "' title  name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' data-special='" + columnDefs[j].special + "' data-errorMsg='" + columnDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' ></textarea>";
                  data += "<label style=' color: red;' id='" + columnDefs[j].name + "label" + "' hidden class='errorLabel'></label>";
                }

                //Adding select-fields
                if(columnDefs[j].type.includes("select")){

                  var options = "";
                  var func = "";
                    for (var i = 0; i < columnDefs[j].options.length; i++) {

                      //Assigning the selected value of the <selected> option
                      options += "<option value='" + columnDefs[j].options[i].value + "'>" + columnDefs[j].options[i].label + "</option>";

                    }

                    if(columnDefs[j].depends)
                    {
                      data += "<select id='" + columnDefs[j].name + "'  name='" + columnDefs[j].name + "' class='form-control' onChange='update()'>" + options + "</select>";
                    }
                    else
                    {
                      data += "<select id='" + columnDefs[j].name + "'  name='" + columnDefs[j].name + "' class='form-control'>" + options + "</select>";
                    }

                    data += "<label style=' color: red;' id='" + columnDefs[j].name + "label" + "' hidden class='errorLabel'></label>";

                
                } 

                 //Adding file-inputs and errorlabels
                if(columnDefs[j].type.includes("file")){
                  data += "<input type='" + columnDefs[j].type + "' title id='" + columnDefs[j].name + "'  pattern='" + columnDefs[j].pattern + " title='" + columnDefs[j].hoverMsg + "' name='" + columnDefs[j].name + "' placeholder='" + columnDefs[j].title + "' data-special='" + columnDefs[j].special + "' data-errorMsg='" + columnDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' value=''>";
                  data += "<label id='" + columnDefs[j].name + "label" + "' class=''>leave empty for no change!</label>";
                }

              data +="</div><div style='clear:both;'></div></div>";                

             }

            //Adding readonly-fields
            if(columnDefs[j].type.includes("readonly")){
              data += "<input type='hidden'  id='" + columnDefs[j].title + "' name='" + columnDefs[j].name + "' title  placeholder='" + columnDefs[j].title + "' style='overflow:hidden'  class='form-control  form-control-sm' value=''>";
            }

          }

          data += "</form>";

            // to add new students

            $('#altEditor-modal').on('show.bs.modal', function() {
            $('#altEditor-modal').find('.modal-title').html('Add Record');
            $('#altEditor-modal').find('.modal-body').html(data);
            $('#altEditor-modal').find('.modal-footer').html("<button type='button' data-content='remove' class='btn btn-default' data-dismiss='modal'>Close</button>\
             <button type='button' data-content='remove' class='btn btn-primary' id='addRowBtn'>Add</button>");

          });


          $('#altEditor-modal').modal('show');
          $('#altEditor-modal input[0]').focus();
          new update();
          if (setDatepicker == 1) 
          {
            $('#dob').daterangepicker({
              singleDatePicker: true,
              singleClasses: "picker_4"
            }, function(start, end, label) {
              console.log(start.toISOString(), end.toISOString(), label);
            });
              }
      },

      _addRowData: function()
      {
        // alert('here');
        var that = this;

	        var form = $('form#altEditor-form-add')[0];
	        var formData = new FormData(form);
	        formData.append('action','add');

	        //Calling AJAX with data, tableObject, command.
	        updateJSON(formData, that, "addRow"); 

},

_getExecutionLocationFolder: function() {
 var fileName = "dataTables.altEditor.js";
 var scriptList = $("script[src]");
 var jsFileObject = $.grep(scriptList, function(el) {

  if(el.src.indexOf(fileName) !== -1 )
  {
   return el;
 }
});
 var jsFilePath = jsFileObject[0].src;
 var jsFileDirectory = jsFilePath.substring(0, jsFilePath.lastIndexOf("/") + 1);
 return jsFileDirectory;
}
} );



   /**
    * altEditor version
    * 
    * @static
    * @type      String
    */
    altEditor.version = '1.0';


   /**
    * altEditor defaults
    * 
    * @namespace
    */
    altEditor.defaults = {
     /** @type {Boolean} Ask user what they want to do, even for a single option */
     alwaysAsk: false,

     /** @type {string|null} What will trigger a focus */
       focus: null, // focus, click, hover

       /** @type {column-selector} Columns to provide auto fill for */
       columns: '', // all

       /** @type {boolean|null} Update the cells after a drag */
       update: null, // false is editor given, true otherwise

       /** @type {DataTable.Editor} Editor instance for automatic submission */
       editor: null
     };


   /**
    * Classes used by altEditor that are configurable
    * 
    * @namespace
    */
    altEditor.classes = {
     /** @type {String} Class used by the selection button */
     btn: 'btn'
   };


   // Attach a listener to the document which listens for DataTables initialisation
   // events so we can automatically initialise
   $(document).on( 'preInit.dt.altEditor', function (e, settings, json) {
     if ( e.namespace !== 'dt' ) {
       return;
     }

     var init = settings.oInit.altEditor;
     var defaults = DataTable.defaults.altEditor;

     if ( init || defaults ) {
       var opts = $.extend( {}, init, defaults );

       if ( init !== false ) {
         new altEditor( settings, opts  );
       }
     }
   });


   // Alias for access
   DataTable.altEditor = altEditor;
   return altEditor;
 }));

//Input validation for text-fields
//var initValidation = function(){
//  var isValid = false;
//  var errorcount = 0;
//
//  //Looping through all text fields
//  $('form[name="altEditor-form"] *').filter(':text').each(function( i ){
//    var errorLabel = "#"+ $(this).attr("id") + "label";
//
//    	// alert($(this).attr("id"));
//
//      if ($.trim($(this).val()) == "") 
//      {
//
//      	$(errorLabel).html('Required Feild');
//        $(errorLabel).show();
//        errorcount++;
//
//      //If no error
//      }else{
//        $(errorLabel).hide();
//        $(errorLabel).empty();
//
//      }
//    });
//
//
//  //Looping through all file fields
//  $('form[name="altEditor-form"] select').each(function( i ){
//    var errorLabel = "#"+ $(this).attr("id") + "label";
//
//    	// alert($(this).attr("id"));
//
//      if ($(this).val() == -1) 
//      {
//      	$(errorLabel).html('Please chose correct option!');
//        $(errorLabel).show();
//        errorcount++;
//
//      //If no error
//      }else{
//        $(errorLabel).hide();
//        $(errorLabel).empty();
//
//      }
//    });
//
//  //Looping through all textarea fields
//  $('form[name="altEditor-form"] textarea').each(function( i ){
//    var errorLabel = "#"+ $(this).attr("id") + "label";
//
//    	// alert($(this).val());
//
//      if ($.trim($(this).val()) == "") 
//      {
//      	$(errorLabel).html('Required Feild');
//        $(errorLabel).show();
//        errorcount++;
//
//      //If no error
//      }else{
//        $(errorLabel).hide();
//        $(errorLabel).empty();
//
//      }
//    });
//
//if(errorcount == 0){
//  isValid = true;
//}
//
//return isValid;
//}

var initValidation = function(){
  var isValid = false;
  var errorcount = 0;

  //Looping through all text fields
  $('form[name="altEditor-form"] #phone').filter(':text').each(function( i ){
       
        var errorLabel = "#"+ $(this).attr("id") + "label";
          // alert($(this).attr("id"));

        if($.trim($(this).val()).length === 0){
            $(errorLabel).hide();
            $(errorLabel).empty();
        }  
        else if ($.trim($(this).val()).length < 10 || $.trim($(this).val()).length > 20) 
        {
            $(errorLabel).html('Not valid');
            $(errorLabel).show();
            errorcount++;
        }
        else{
            $(errorLabel).hide();
            $(errorLabel).empty();
        }
    });
    
     //Looping through all text fields
  $('form[name="altEditor-form"] #phone2').filter(':text').each(function( i ){
       
        var errorLabel = "#"+ $(this).attr("id") + "label";
          // alert($(this).attr("id"));

        if($.trim($(this).val()).length === 0){
            $(errorLabel).hide();
            $(errorLabel).empty();
        }  
        else if ($.trim($(this).val()).length < 10 || $.trim($(this).val()).length > 20) 
        {
            $(errorLabel).html('Not valid');
            $(errorLabel).show();
            errorcount++;
        }
        else{
            $(errorLabel).hide();
            $(errorLabel).empty();
        }
    });
    
    
    $('form[name="altEditor-form"] #name').filter(':text').each(function( i ){
        var errorLabel = "#"+ $(this).attr("id") + "label";
        if ($.trim($(this).val()) === "") 
        {

          $(errorLabel).html('Required');
          $(errorLabel).show();
          errorcount++;

        //If no error
        }else{
          $(errorLabel).hide();
          $(errorLabel).empty();

        }
    });
    
    $('form[name="altEditor-form"] #fathers_name').filter(':text').each(function( i ){
        var errorLabel = "#"+ $(this).attr("id") + "label";
        if ($.trim($(this).val()) === "") 
        {

          $(errorLabel).html('Required');
          $(errorLabel).show();
          errorcount++;

        //If no error
        }else{
          $(errorLabel).hide();
          $(errorLabel).empty();

        }
    });
    
    $('form[name="altEditor-form"] #mothers_name').filter(':text').each(function( i ){
        var errorLabel = "#"+ $(this).attr("id") + "label";
        if ($.trim($(this).val()) === "") 
        {

          $(errorLabel).html('Required');
          $(errorLabel).show();
          errorcount++;

        //If no error
        }else{
          $(errorLabel).hide();
          $(errorLabel).empty();

        }
    });
    
    $('form[name="altEditor-form"] #dob').filter(':text').each(function( i ){
        var errorLabel = "#"+ $(this).attr("id") + "label";
        if ($.trim($(this).val()) === "") 
        {

          $(errorLabel).html('Required');
          $(errorLabel).show();
          errorcount++;

        //If no error
        }else{
          $(errorLabel).hide();
          $(errorLabel).empty();

        }
    });
    
    $('form[name="altEditor-form"] #adm_no').filter(':text').each(function( i ){
        var errorLabel = "#"+ $(this).attr("id") + "label";
        if ($.trim($(this).val()) === "") 
        {

          $(errorLabel).html('Required ');
          $(errorLabel).show();
          errorcount++;

        //If no error
        }else{
          $(errorLabel).hide();
          $(errorLabel).empty();

        }
    });
    $('form[name="altEditor-form"] #username').filter(':text').each(function( i ){
        var errorLabel = "#"+ $(this).attr("id") + "label";
        if ($.trim($(this).val()) === "") 
        {
          $(errorLabel).html('Required');
          $(errorLabel).show();
          errorcount++;

        //If no error
        }else{
          $(errorLabel).hide();
          $(errorLabel).empty();

        }
    });
    
    $('form[name="altEditor-form"] #address').filter(':text').each(function( i ){
        var errorLabel = "#"+ $(this).attr("id") + "label";
        if ($.trim($(this).val()) === "") 
        {
          $(errorLabel).html('Required');
          $(errorLabel).show();
          errorcount++;

        //If no error
        }else{
          $(errorLabel).hide();
          $(errorLabel).empty();

        }
    });

    //section
    $('form[name="altEditor-form"] #section').filter(':text').each(function( i ){
        var errorLabel = "#"+ $(this).attr("id") + "label";
        if ($.trim($(this).val()) === "") 
        {
          $(errorLabel).html('Required');
          $(errorLabel).show();
          errorcount++;

        //If no error
        }else{
          $(errorLabel).hide();
          $(errorLabel).empty();

        }
    });
    $('form[name="altEditor-form"] #password').filter(':text').each(function( i ){
        var errorLabel = "#"+ $(this).attr("id") + "label";
        if ($.trim($(this).val()) === "") 
        {
          $(errorLabel).html('Required');
          $(errorLabel).show();
          errorcount++;

        //If no error
        }else{
          $(errorLabel).hide();
          $(errorLabel).empty();

        }
    });
    


  //Looping through all file fields
  $('form[name="altEditor-form"] select').each(function( i ){
    var errorLabel = "#"+ $(this).attr("id") + "label";

    	// alert($(this).attr("id"));

      if ($(this).val() === -1) 
      {
      	$(errorLabel).html('Please chose correct option!');
        $(errorLabel).show();
        errorcount++;

      //If no error
      }else{
        $(errorLabel).hide();
        $(errorLabel).empty();

      }
    });

  //Looping through all textarea fields
  $('form[name="altEditor-form"] textarea#message').each(function( i ){
    var errorLabel = "#"+ $(this).attr("id") + "label";

    	// alert($(this).val());
        
            if ($.trim($(this).val()) === "") 
            {
              $(errorLabel).html('Required');
              $(errorLabel).show();
              errorcount++;

            //If no error
            }else{
              $(errorLabel).hide();
              $(errorLabel).empty();

            }
        
    });

    if(errorcount === 0){
      isValid = true;
    }

    return isValid;
};

function validate(current, errorcount){
    
}

//AJAX function - will reload table if succesfull
var updateJSON = function(data, tableObj, act){
  
  var dt = tableObj.s.dt;
    var page = "";

  checkUrl = "";
  checkStudentUrl = false; 
  checkSectionUrl = false;
   // alert(dt.context[0].ajax.url);

  if (dt.context[0].ajax.url) 
  {
    checkUrl = dt.context[0].ajax.url;
    if (dt.context[0].ajax.url == 'feedbackDAO.php')
    {
      success_message = 'Feedback has been sent';
      fail_message = 'Error occured while sending feeback!';
     
    }
    else if (dt.context[0].ajax.url == 'academiaDAO.php') 
    {
      success_message = 'Message has been sent';
      fail_message = 'Error occured while sending message!';
     
    }


    
    else if (dt.context[0].ajax.url == 'studentDAO.php')
    {
      if (act == 'video') {
        checkStudentUrl = true;
        success_message = 'Video has been sent';
        fail_message = 'Error occured while sending video!';
      }else{
       checkStudentUrl = true;
       success_message = 'Student details updated successfully';
       fail_message = 'Error occured while updating student details!';
      }
    }
    else if (dt.context[0].ajax.url == 'sectionDAO.php')
    {
      checkSectionUrl = true;
    }
  }
  else
  {
    checkUrl = dt.context[0].ajax;
     // alert(checkUrl);
      if (checkUrl == 'notesDAO.php') 
        {

          success_message = 'Notes have been deleted successfully';
          fail_message = 'Error occured while deleting notes!';
          page = 'notes';
        }
      
      else if (checkUrl == 'videosDAO.php') 
        {

          success_message = 'Video has been deleted successfully';
          fail_message = 'Error occured while deleting this video!';
          page = 'videos';
        }
       else if (checkUrl == 'imagesDAO.php') 
        {

          success_message = 'Image has been deleted successfully';
          fail_message = 'Error occured while deleting this image!';
          page = 'images';
        }
         else if (checkUrl == 'upload_attendance.php') 
        {

          success_message = 'Attendance has been deleted successfully';
          fail_message = 'Error occured while deleting this attendance!';
          page = 'attendance';
        }
      else if (checkUrl == 'syllabusDAO.php') 
        {

          success_message = 'Syllabus has been deleted successfully';
          fail_message = 'Error occured while deleting this syllabus!';
          page = 'syllabus';
        }
     else if (checkUrl == 'upload_subject_teacher.php') 
        {

          success_message = 'Subject Teacher details deleted successfully';
          fail_message = 'Error occured while deleting this subject teacher detail!';
          page = 'subjectTeacher';
        }
      else if (checkUrl == 'eventDAO.php') 
        {

          success_message = 'Event deleted successfully';
          fail_message = 'Error occured while deleting this event!';
          page = 'event';
        }
  }

  console.log("start : " + checkUrl +" "+ checkSectionUrl + " " + checkStudentUrl + " " + success_message + " " + fail_message + " " + dt);

  if (checkUrl == ajaxUrl && count == 0) 
  {
      count++;
  	  $.ajax({
	    url: ajaxUrl,
	    type : "POST",
	    processData: false,
	    contentType: false,
	    cache: false,
	    data: data,
	    
	  })
	  	.done (function(data) { 
      // alert(data);

      

	    //If data = false, then data is already present
	    //Server doesn't allow duplicate data.
	    if($.trim(data) !== "success"){ 



        if (act == feedback) 
        {
          new PNotify({
            title: 'Status',
            text: fail_message,
            type: 'error',
            styling: 'bootstrap3'
        });
        } // to delete data from data tables 
            // when delete is unsuccessfull
            else if(act == 'deleteRow'){
            new PNotify({
            title: 'Status',
            text: fail_message,
            type: 'error',
            styling: 'bootstrap3'
        });
             // to reload pages after delete unsuccessfull
            if(page == 'notes'){
                dt.ajax.reload();
            } else if(page == 'videos'){
                dt.ajax.reload();
            } else  if(page == 'images'){
                dt.ajax.reload();
            } else   if(page == 'attendance'){
                dt.ajax.reload();
            } else   if(page == 'syllabus'){
                dt.ajax.reload();
            }  else   if(page == 'subjectTeacher'){
                dt.ajax.reload();
            }   else   if(page == 'event'){
                dt.ajax.reload();
            } 
        } else if ($.trim(data) == "exists") {
          if (dt.context[0].ajax.url == 'studentDAO.php')
          {
            // window.location.reload();
            //dt.ajax.reload();
            new PNotify({
              title: 'Status',
              text: 'Admission No. Already Exists',
              type: 'error',
              styling: 'bootstrap3'
            });
            count--;
          }else {
            new PNotify({
              title: 'Status',
              text: 'Teacher Already Exists',
              type: 'error',
              styling: 'bootstrap3'
            });
            count--;
          }
        }
        else
        {

	      $('#altEditor-modal .modal-body .alert').remove();

	      var message = '<div class="alert alert-danger" role="alert">\
	      <strong>' + data + '</strong>\
	      </div>';
	      $('#altEditor-modal .modal-body').append(message); 
        }
	    }else{

        $('#altEditor-modal').modal('hide');

        if (act == 'feedback')
        {
        	console.log("feedback : " + checkUrl +" "+ checkSectionUrl + " " + checkStudentUrl + " " + success_message + " " + fail_message + " " + dt);
          new PNotify({
            title: 'Status',
            text: success_message,
            type: 'success',
            styling: 'bootstrap3'
          });
        }
        else if (act == 'video')
        {
          console.log("video : " + checkUrl +" "+ checkSectionUrl + " " + checkStudentUrl + " " + success_message + " " + fail_message + " " + dt);
          new PNotify({
            title: 'Status',
            text: success_message,
            type: 'success',
            styling: 'bootstrap3'
          });
        }else if (act == 'deleteRow') //to delete data from data tables
        {
        	console.log("Delete : " + checkUrl +" "+ checkSectionUrl + " " + checkStudentUrl + " " + success_message + " " + fail_message + " " + dt);
         // when delete is successfull
            new PNotify({
            title: 'Status',
            text: success_message,
            type: 'success',
            styling: 'bootstrap3'
          });
            // to reload pages after delete
            if(page == 'notes'){
                dt.ajax.reload();
            } else if(page == 'videos'){
                dt.ajax.reload();
            } else  if(page == 'images'){
                dt.ajax.reload();
            } else   if(page == 'attendance'){
                dt.ajax.reload();
            } else   if(page == 'syllabus'){
                dt.ajax.reload();
            }  else   if(page == 'subjectTeacher'){
                dt.ajax.reload();
            }  else   if(page == 'event'){
                dt.ajax.reload();
            }  
            if (dt.context[0].ajax.url == 'studentDAO.php')
            {
              studentTable.ajax.reload();
              //console.log("studentTable : " + checkUrl +" "+ checkSectionUrl + " " + checkStudentUrl + " " + success_message + " " + fail_message + " " + dt);
            }
        } 
        else
        {	
        
  	      $('#altEditor-modal .modal-body .alert').remove();

          //Reload data from server to table
          if (checkStudentUrl)
          {
            studentTable.ajax.reload();
            console.log("studentTable : " + checkUrl +" "+ checkSectionUrl + " " + checkStudentUrl + " " + success_message + " " + fail_message + " " + dt);
          }
          else if (checkSectionUrl)
          {
            sectionTable.ajax.reload();
            console.log("sectionTable : " + checkUrl +" "+ checkSectionUrl + " " + checkStudentUrl + " " + success_message + " " + fail_message + " " + dt);
          }
          else
          {
          	if (ajaxUrl === 'teacherDAO.php') 
          	{
          		teacherTable.ajax.reload();
          		console.log("teacherTable");
          	}
          	else if (ajaxUrl === 'studentDAO.php') 
          	{
          		dstudentTable.ajax.reload();
          		console.log("dstudentTable");
          	}
          	else if (ajaxUrl === 'sectionDAO.php') 
          	{
          		dsectionTable.ajax.reload();
          		console.log("dsectionTable");
          	}
          	else
          	{
          		dt.ajax.reload();
          	}
            
            console.log("otherTables : " + checkUrl +" "+ checkSectionUrl + " " + checkStudentUrl + " " + success_message + " " + fail_message + " " + dt);
          }
      }

	      //Disabling submit button
	       // $("#"+act+"Btn").prop('disabled', true);
	    }
	   })
	   .fail (function(error)  { 

	   $('#altEditor-modal .modal-body .alert').remove();

	   var message = '<div class="alert alert-danger" role="alert">\
	   <strong>Error!</strong> Reponse code: ' + error.status + '\
	   </div>';

	   $('#altEditor-modal .modal-body').append(message); });

  }


}

  