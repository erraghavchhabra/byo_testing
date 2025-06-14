import React, { useState, useRef } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const GalleryImages = ({ images }) => {
  const [selected, setSelected] = useState(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const open = (url) => {
    setSelected(url);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const close = () => {
    setSelected(null);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 1));

  const onMouseDown = (e) => {
    if (scale === 1) return;
    setIsDragging(true);
    startPos.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    setOffset({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    });
  };

  const onMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  if (!images?.length) return null;

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row g-3">
          {images.map((img, i) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
              <div
                className="border rounded shadow-sm h-100"
                style={{ cursor: "pointer" }}
                onClick={() => open(img?.asset?.url)}
              >
                <img
                  src={img?.asset?.url}
                  alt={`Gallery ${i + 1}`}
                  className="img-fluid w-100"
                  style={{ objectFit: "cover", height: "250px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────── Modal with Framer Motion ─────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal fade show d-block"
            style={{
              backgroundColor: "rgba(0,0,0,0.85)",
              zIndex: 1050,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <motion.div
              className="modal-dialog modal-xl modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-content bg-transparent border-0">
                <div
                  className="modal-body p-0"
                  style={{ maxHeight: "90vh", overflow: "hidden" }}
                >
                  <img
                    src={selected}
                    alt="zoomed"
                    draggable={false}
                    onMouseDown={onMouseDown}
                    className="user-select-none"
                    style={{
                      cursor: scale > 1 ? "grab" : "default",
                      transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                      transition: isDragging
                        ? "none"
                        : "transform 0.3s ease-out",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                </div>

                {/* Controls */}
                <div className="position-absolute top-0 end-0 mt-3 me-3 d-flex flex-column gap-2">
                  <button className="btn btn-light p-2" onClick={close}>
                    <CgClose size={20} />
                  </button>
                  <button
                    className="btn btn-light p-2"
                    onClick={zoomIn}
                    disabled={scale >= 3}
                  >
                    <FiPlus />
                  </button>
                  <button
                    className="btn btn-light p-2"
                    onClick={zoomOut}
                    disabled={scale <= 1}
                  >
                    <FiMinus />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryImages;
