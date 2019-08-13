import React from 'react'


const ConfirmationDialog =({decline,confirm, children,modalId})=>{
        return(<div>
            <div className="modal fade" id={modalId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Confirmation is needed</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {children}
                  </div>
                  <div className="modal-footer">
                    <button onClick={decline} type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button onClick={confirm} type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
                  </div>
                </div>
              </div>
            </div>
            </div>)
    }

export default ConfirmationDialog