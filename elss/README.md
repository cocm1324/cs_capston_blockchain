ELSS v0.0.5 릴리즈 노트
모델 목록
-	Election id by electionKey
-	Student id by studentId
-	VotingBox id by boxId

트랜잭션 개요
-	Election관련
	createElection(school, name, electionDate, quorumRate)
electionKey를 만듬, 파라미터 내용을 팩토리에 집어넣어 Election을 만든 후 레지스트리에 추가한다.

	deleteElection(electionKey)
레지스트리에 electionKey에 해당하는 객체가 있는지 확인하고 있으면 지운다.

	changeElectionStatus(electionKey, status)
레지스트리에 electionKey에 해당하는 객체가 있는지 확인하고 있으면 status파라미터 값대로 해당 Election의 status변경

	addVotingBox(electionKey, boxId)
사실 필요없는 트랜잭션이긴 한데 혹시 몰라서 일단 넣어놓음(VotingBox생성시 자동으로 추가되기 때문), 해당 electionKey의 Election에 boxId의 VotingBox를 연결하는 트잭

	addCasted(electionKey, studentId)
학생이 투표를 했는지 기록하는 함수임, electionKey에 해당하는 객체와 studentId에 해당하는 객체를 받아옴, 먼저 Election이 존재하는지, POLL상태인지 체크함, 이후 학생이 존재하는지, 출석되어있는지, 학부가 일치하는지, 이미 투표하지는 않았는지 체크함, 이후 Election의 casted에 studentId를 추가함

-	Student관련
	createStudent(studentId, name, school, email, cell)
마찬가지로 파라미터를 가지고와서 Student객체를 만들어 레지스트리에 추가함

	deleteStudent(studentId)
해당 ID의 객체가 레지스트리에 있는지 파악후 삭제함

	setAttendance(studentId, attendance)
해당 ID의 객체가 존재하는지 확인 후 파라미터attendance의 값 대로 객체의 attendance값을 바꿈

-	VotingBox관련
	createVotingBox(electionKey, name)
먼저 boxId를 두 파라미터를 조합해 만듬(‘electionKey:name’) 팩토리를 만들어 VotingBox객체 만듬, Election과의 관계 설정 -> 파라미터electionKey에 해당하는 Election객체 받아와서 존재하는지, 그리고 PREP상태인지 체크 -> 해당 객체의 boxes 배열에 만들어진 VotingBox객체의 관계를 추가함

	deleteVotingBox(boxId)
박스ID에 해당하는 객체가 잇는지 체크 -> 박스에 연결된 Election이 존재하는지, 그리고 PREP상태인지 체크 -> 삭제

	ballotCast(boxId)
박스 ID에 해당하는 객체 있는지 체크, 박스에 연결된 election이 존재하는지 그리고 POLL상태인지 체크 -> 값이 1 올라감

주요 이슈
1.	addCasted트랜잭션이 정상적으로 실행된 이후 ballotCast가 실행되도록 웹단에서 조정해야함 -> 왜냐하면 addCasted트랜잭션에서 모든 유효성 검사를 하기 때문
2.	아직 acl파트를 작성하지 못함
