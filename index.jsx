'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var dispatcher = require('@crsincca/xrd-dispatch-module');

class LoadXrdFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: { name: 'not selected' },
            isSelected: false
        };
    }

    onFileSelected(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        this.setState({
            file: file,
            isSelected: true
        });
    }

    openFile() {
        dispatcher.emit('open-file', this.state.file);
    }

    render() {
        return (
            <div>
                <div className='modal fade' id='load-file-modal' tabIndex='-1' role='dialog'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                                <h4 className='modal-title'>Open XRD data file</h4>
                            </div>
                            <div className='modal-body'>
                                <form>
                                    <h3 className='row'>
                                        <label className='btn btn-default'>
                                            Select file
                                            <input type='file' name='file' style={{ display: 'none' }} onChange={this.onFileSelected} />
                                        </label>
                                        <label>
                                            <span className={this.state.isSelected ? 'label label-success' : 'label label-default'}>{this.state.file.name}</span>
                                        </label>
                                    </h3>
                                </form>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
                                <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={this.openFile}>Open</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

dispatcher.on('init-load-file', function (payload) {
    ReactDOM.render(<LoadXrdFile />, document.getElementById(payload.mainGuiId));
    dispatcher.emit('add-main-menu-item', { File: { Open: { message: 'load-file', 'data-toggle': 'modal', href: '#load-file-modal' } } });
});

dispatcher.emit('plugin-hand-shake', 'xrd-load-file');
