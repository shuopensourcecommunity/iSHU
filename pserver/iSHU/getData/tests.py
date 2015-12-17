from django.test import TestCase

# Create your tests here.


class APITest(TestCase):

    @classmethod
    def setUPTestData(cls):
        ''' set up data for whole test case
        Returns:

        '''
        pass

    def test_get_xgb_msg_list(self):
        response = self.client.get('/')
