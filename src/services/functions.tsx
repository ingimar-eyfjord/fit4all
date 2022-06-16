class Functions {

  haversine_distance(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371.0710; // Radius of the Earth in miles
    var rlat1 = lat1 * (Math.PI/180); // Convert degrees to radians
    var rlat2 = lat2 * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (lon2-lon1) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }

  // haversine_distance(lat1: number, lon1: number, lat2: number, lon2: number, unit:string) {
  //   if ((lat1 == lat2) && (lon1 == lon2)) {
  //     return 0;
  //   }
  //   else {
  //     var radlat1 = Math.PI * lat1/180;
  //     var radlat2 = Math.PI * lat2/180;
  //     var theta = lon1-lon2;
  //     var radtheta = Math.PI * theta/180;
  //     var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  //     if (dist > 1) {
  //       dist = 1;
  //     }
  //     dist = Math.acos(dist);
  //     dist = dist * 180/Math.PI;
  //     dist = dist * 60 * 1.1515;
  //     if (unit=="K") { dist = dist * 1.609344 }
  //     if (unit=="N") { dist = dist * 0.8684 }
  //     return dist;
  //   }
  // }


}
export default new Functions();
