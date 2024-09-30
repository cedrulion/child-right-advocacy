const CaseReport = require('../models/CaseReport');

// Create a new case report
exports.createCaseReport = async (req, res) => {
  try {
    const { reportAs, typeOfAbuse, abusedChildName, abusedChildAge, abusedChildAddress, guardianName, guardianAddress, caseSuspectName, caseSuspectAge, caseSuspectRelation, caseSuspectAddress } = req.body;

    // Assuming userId comes from an authenticated request
    const userId = req.user._id; // This assumes you're using some authentication middleware that adds the user to req object

    const newCaseReport = new CaseReport({
      userId,
      reportAs,
      typeOfAbuse,
      abusedChildName,
      abusedChildAge,
      abusedChildAddress,
      guardianName,
      guardianAddress,
      caseSuspectName,
      caseSuspectAge,
      caseSuspectRelation,
      caseSuspectAddress,
    });

    await newCaseReport.save();

    res.status(201).json({ message: 'Case report created successfully', caseReport: newCaseReport });
  } catch (error) {
    console.error('Error creating case report:', error);
    res.status(500).json({ message: 'Error creating case report', error });
  }
};

// Get case reports by user ID
exports.getCaseReportsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const caseReports = await CaseReport.find({ userId });

    if (!caseReports) {
      return res.status(404).json({ message: 'No case reports found' });
    }

    res.status(200).json(caseReports);
  } catch (error) {
    console.error('Error fetching case reports:', error);
    res.status(500).json({ message: 'Error fetching case reports', error });
  }
};
