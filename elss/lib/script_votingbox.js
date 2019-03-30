/**
 * 
 * Create avoting box Transaction
 * @param {org.elss.votingbox.createVotingBox} boxData
 * @transaction
 */
function createVotingBox(boxData) {
    var boxRegistry = {};
    var electionRegistry = {};
    var boxBuff = {};
    var electionBuff = {};
    var boxId = '';

    return getAssetRegistry('org.elss.votingbox.VotingBox').then(function(registry1){
        boxRegistry = registry1;

        var factory1 = getFactory();
        boxId = '' + boxData.electionKey + ':' + boxData.name;
        var box = factory1.newResource('org.elss.votingbox', 'VotingBox', boxId);
        box.name = boxData.name;

        var relationship1 = factory1.newRelationship('org.elss.election','Election',boxData.electionKey);
        box.election = relationship1;
        boxBuff = box;

        return getAssetRegistry('org.elss.election.Election');
    }).then(function(registry2){
        electionRegistry = registry2;
        return electionRegistry.get(boxData.electionKey);
    }).then(function(election){
        if(!election) throw new Error(""+ boxData.electionKey + "(은)는 리스트에 존재하지 않습니다.");
        if(election.status!='PREP') throw new Error("" + boxData.electionKey + "(은)는 현재 선거준비 상태가 아닙니다.");
        
        electionBuff = election;

        return boxRegistry.add(boxBuff);
    }).then(function(){
        var factory2 = getFactory();
        var relationship2 = factory2.newRelationship('org.elss.votingbox','VotingBox',boxId);
        electionBuff.boxes.unshift(relationship2);
        
        return electionRegistry.update(electionBuff);
    }).then(function(){
        var event = getFactory().newEvent('org.elss.votingbox', 'votingBoxCreated');
        event.electionKey = boxData.electionKey;
        event.boxId = boxId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });

}

/**
 * 
 * Casting a vote Transaction
 * @param {org.elss.votingbox.deleteVotingBox} boxData
 * @transaction
 */
function deleteVotingBox(boxData) {
    var boxRegistry = {};
    var electionRegistry = {};
    var boxBuff = {};
    var electionKey = '';
    
    return getAssetRegistry('org.elss.votingbox.VotingBox').then(function(registry1){
        boxRegistry = registry1
        return boxRegistry.get(boxData.boxId);
    }).then(function(box){
        if(!box) throw new Error("" + boxData.boxId + "(은)는 리스트에 존재하지 않습니다.");
        boxBuff = box;
        electionKey = box.election.getIdentifier();

        return getAssetRegistry('org.elss.election.Election');
    }).then(function(registry2){
        electionRegistry = registry2;
        return electionRegistry.get(electionKey);
    }).then(function(election){
        if(!election) throw new Error(""+ electionKey + "(은)는 리스트에 존재하지 않습니다.");
        if(election.status!='PREP') throw new Error("" + electionKey + "(은)는 현재 선거준비 상태가 아닙니다.");

        return boxRegistry.remove(boxBuff);
    }).then(function(){
        var event = getFactory().newEvent('org.elss.votingbox', 'votingBoxDeleted');
        event.boxId = boxData.boxId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}

/**
 * 
 * Casting a vote Transaction
 * @param {org.elss.votingbox.ballotCast} ballotData
 * @transaction
 */
function ballotCast(ballotData) {
    var boxRegistry={};
    var electionRegistry={};
    var boxBuff={};
    var electionKey = "";
    
    return getAssetRegistry('org.elss.votingbox.VotingBox').then(function(registry1){
        boxRegistry = registry1;
        return boxRegistry.get(ballotData.boxId);
    }).then(function(box){
        if(!box) throw new Error("" + ballotData.boxId + "(은)는 리스트에 존재하지 않습니다.");
        
        boxBuff = box;
        electionKey = box.election.getIdentifier();
        
        return getAssetRegistry('org.elss.election.Election');
    }).then(function(registry2){
        electionRegistry = registry2;
        return electionRegistry.get(electionKey);
    }).then(function(election){
        if(!election) throw new Error(""+ electionKey + "(은)는 리스트에 존재하지 않습니다.");
        if(election.status!='POLL') throw new Error("" + electionKey + "(은)는 현재 선거진행 상태가 아닙니다.");

        boxBuff.ballotCount = boxBuff.ballotCount + 1;

        return boxRegistry.update(boxBuff);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.elss.votingbox', 'ballotCasted');
        event.boxId = ballotData.boxId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}