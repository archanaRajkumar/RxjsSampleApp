angular.module("ClientServerSampleApp",[])
.controller("msgCtrl",['$scope', function($scope){
	$scope.$toObservable("viewContentLoaded")


}])
.controller("sendCtrl", ['$scope','rxjsService', function($scope,service){
	$scope.broadcast=function(){
	 $scope.error =service.send($scope.msg)
	}
}])
.service("rxjsService", ['rx', function(rx){
	var ws, observer, observable;
	this.subscribeToMsgs=function(){
	 ws= new WebSocket();
	 observer= rx.Observer()
	 observable=rx.Observable(function(obs){

	 })
	 return rx.Subject(observer,observable)
	}
	this.send=function(msg){
		if(ws.readyState==1){
			ws.send(msg)
		}
		else 
			return "error"
	}
}])