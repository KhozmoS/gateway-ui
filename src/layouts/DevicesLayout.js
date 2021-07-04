import { DevicesList } from "../components";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "antd";
import { deviceService, gatewayService } from "../services";

// rowSelection object indicates the need for row selection

function DevicesLayout() {
  const [loading, setLoading] = React.useState(false);
  const [devices, setDevices] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [assigning, setAssigning] = React.useState(false);
  const { serialNumber } = useParams();

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    deviceService
      .listDevices()
      .then(resp => resp.data.map(d => {
        d["key"] = d.uid;
        d["created"] = d.created.substr(0, 10);
        return d;
      }))
      .then(arr => {
        if (mounted) {          
          setTimeout(() => {
            setDevices(arr);
            setLoading(false);
          }, 300)
        }
      })
      .catch(err => {
        setLoading(false);
        let message = err?.response?.data?.title || "Unexpected error.";
        const errorObj = err?.response?.data.errors;
        if (errorObj && Object.keys(errorObj).length > 0) {
          message = errorObj[Object.keys(errorObj)[0]][0];
        }
        alert(message);
      });
    return () => mounted = false;
  // WHEN RELOAD VALUE CHANGES THIS HOOK IS RE ACTIVATED, AND FETCH GATEWAYS
  }, [reload]);
  const reloadDevices = () => setReload(!reload);
  const assignDevices = () => {
    (async () => {
      try {
        setAssigning(true);
        await gatewayService.assignDevices(serialNumber, selected);
        reloadDevices();        
      } catch(err) {
        let message = err?.response?.data?.title || "Unexpected error.";
        const errorObj = err?.response?.data.errors;
        if (errorObj && Object.keys(errorObj).length > 0) {
          message = errorObj[Object.keys(errorObj)[0]][0];
        }
        alert(message);
      } finally {
        setAssigning(false);
      }
    })();
  }
  return (    
    <div className="centered" style={{ maxWidth: 800 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ marginBottom: 10 }}>
          <Link to="/gateway" style={{ textDecoration: "underline" }}>Back</Link>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Button type="primary" loading={assigning} onClick={assignDevices}>
            Update
          </Button>
        </div>
      </div>
      <DevicesList 
        devices={devices} 
        loading={loading} 
        selected={selected}
        setSelected={setSelected}
      />
    </div>    
  );
}

export default DevicesLayout;
