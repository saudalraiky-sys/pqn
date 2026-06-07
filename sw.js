self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('push', function(e){
  var d={title:'PQN',body:'إشعار جديد',url:'./'};
  try{ d=Object.assign(d, e.data.json()); }catch(err){ try{ if(e.data) d.body=e.data.text(); }catch(_){} }
  e.waitUntil(self.registration.showNotification(d.title,{body:d.body,icon:'icon-192.png',badge:'icon-192.png',dir:'rtl',lang:'ar',vibrate:[60,40,60],data:{url:d.url}}));
});
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var url=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cl){
    for(var i=0;i<cl.length;i++){ if('focus' in cl[i]) return cl[i].focus(); }
    if(self.clients.openWindow) return self.clients.openWindow(url);
  }));
});
