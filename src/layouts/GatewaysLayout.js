import { GatewayList, AddGatewayModal } from "../components";
import { gatewayService } from "../services";
import { Link } from "react-router-dom";
import React from "react";
function GatewayLayout() {
  const [loading, setLoading] = React.useState(false);
  const [gateways, setGateways] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    gatewayService.listGateways()
      .then(resp => resp.data.map(g => { 
        g["key"] = g.serialNumber;
        g["devices"] = <Link to={`/gateway/${g.serialNumber}/devices`}>Edit Devices</Link>;
        return g;
      }))
      .then(arr => {
        if (mounted) {          
          setTimeout(() => {
            setGateways(arr);
            setLoading(false);
          }, 300)
        }
      })
      .catch(err => window.alert(err));
    return () => mounted = false;
  // WHEN RELOAD VALUE CHANGES THIS HOOK IS RE ACTIVATED, AND FETCH GATEWAYS
  }, [reload]);
  const reloadGateways = () => setReload(!reload);

  return (    
    <div className="centered" style={{ maxWidth: 800 }}>
      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <AddGatewayModal onAdded={reloadGateways} />
      </div>
      <GatewayList gateways={gateways} loading={loading} />
    </div>    
  );
}

export default GatewayLayout;
