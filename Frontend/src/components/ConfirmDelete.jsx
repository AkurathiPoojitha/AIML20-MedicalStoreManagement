function ConfirmDelete({
  show,
  closeModal,
  deleteSupplier,
  supplierName,
}) {
  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">

        <div className="modal-content">

          <div className="modal-header bg-danger text-white">

            <h5>Delete Supplier</h5>

          </div>

          <div className="modal-body">

            <p>
              Are you sure you want to delete
              <strong> {supplierName}</strong> ?
            </p>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={deleteSupplier}
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ConfirmDelete;